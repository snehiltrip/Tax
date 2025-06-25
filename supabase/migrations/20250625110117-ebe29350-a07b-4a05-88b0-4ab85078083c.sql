
-- Create users profile table for additional user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  annual_income DECIMAL(12,2),
  employment_type TEXT CHECK (employment_type IN ('salaried', 'business', 'freelancer')),
  tax_regime TEXT CHECK (tax_regime IN ('old', 'new')) DEFAULT 'new',
  aadhaar_last_four TEXT,
  goals TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tax calculations table
CREATE TABLE public.tax_calculations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  income_amount DECIMAL(12,2) NOT NULL,
  tax_regime TEXT NOT NULL,
  calculated_tax DECIMAL(12,2) NOT NULL,
  potential_savings DECIMAL(12,2) NOT NULL,
  deductions JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create documents table
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  category TEXT CHECK (category IN ('medical', 'education', 'home_loan', 'investment', 'other')),
  file_url TEXT,
  upload_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  file_size INTEGER,
  processed BOOLEAN DEFAULT FALSE
);

-- Create chat messages table for AI interactions
CREATE TABLE public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  message TEXT NOT NULL,
  response TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  message_type TEXT CHECK (message_type IN ('user', 'ai')) DEFAULT 'user'
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tax_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for tax_calculations
CREATE POLICY "Users can view their own tax calculations" 
  ON public.tax_calculations FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tax calculations" 
  ON public.tax_calculations FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tax calculations" 
  ON public.tax_calculations FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create RLS policies for documents
CREATE POLICY "Users can view their own documents" 
  ON public.documents FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own documents" 
  ON public.documents FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" 
  ON public.documents FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents" 
  ON public.documents FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for chat_messages
CREATE POLICY "Users can view their own chat messages" 
  ON public.chat_messages FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own chat messages" 
  ON public.chat_messages FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'phone', '')
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
