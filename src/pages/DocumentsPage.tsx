
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Upload,
  FileText,
  Camera,
  Download,
  Trash2,
  Search,
  Filter,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DocumentsPage = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock documents data
  const documents = [
    {
      id: '1',
      name: 'Form 16 - FY 2023-24',
      category: 'income',
      type: 'pdf',
      size: '245 KB',
      uploadDate: '2024-03-15',
      status: 'processed',
      extractedData: {
        totalIncome: '₹12,50,000',
        taxDeducted: '₹1,15,000'
      }
    },
    {
      id: '2',
      name: 'Health Insurance Premium Receipt',
      category: 'medical',
      type: 'jpg',
      size: '1.2 MB',
      uploadDate: '2024-03-10',
      status: 'processing',
      extractedData: null
    },
    {
      id: '3',
      name: 'ELSS Investment Certificate',
      category: 'investment',
      type: 'pdf',
      size: '180 KB',
      uploadDate: '2024-03-08',
      status: 'processed',
      extractedData: {
        investmentAmount: '₹1,50,000',
        section: '80C'
      }
    },
    {
      id: '4',
      name: 'Home Loan Interest Certificate',
      category: 'home_loan',
      type: 'pdf',
      size: '320 KB',
      uploadDate: '2024-03-05',
      status: 'processed',
      extractedData: {
        interestPaid: '₹2,80,000',
        loanType: 'Home Loan'
      }
    },
    {
      id: '5',
      name: 'Education Fee Receipt',
      category: 'education',
      type: 'jpg',
      size: '890 KB',
      uploadDate: '2024-03-01',
      status: 'failed',
      extractedData: null
    }
  ];

  const categories = [
    { value: 'all', label: 'All Documents' },
    { value: 'income', label: 'Income Documents' },
    { value: 'medical', label: 'Medical' },
    { value: 'investment', label: 'Investments' },
    { value: 'home_loan', label: 'Home Loan' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Processed</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Processing</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.label : category;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <FileText className="h-8 w-8 mr-3 text-blue-600" />
            Document Manager
          </h1>
          <p className="text-gray-600">Upload, organize, and manage your tax documents</p>
        </div>

        {/* Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed border-2 border-blue-300">
            <CardContent className="p-6 text-center">
              <Upload className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Upload Document</h3>
              <p className="text-gray-600 text-sm mb-4">Drag & drop files or click to browse</p>
              <Button className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-dashed border-2 border-green-300">
            <CardContent className="p-6 text-center">
              <Camera className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Scan Receipt</h3>
              <p className="text-gray-600 text-sm mb-4">Use camera to scan receipts instantly</p>
              <Button variant="outline" className="w-full">
                <Camera className="h-4 w-4 mr-2" />
                Open Camera
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Upload Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Documents</span>
                  <span className="font-semibold">{documents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processed</span>
                  <span className="font-semibold text-green-600">
                    {documents.filter(d => d.status === 'processed').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing</span>
                  <span className="font-semibold text-yellow-600">
                    {documents.filter(d => d.status === 'processing').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Failed</span>
                  <span className="font-semibold text-red-600">
                    {documents.filter(d => d.status === 'failed').length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-white"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Documents ({filteredDocuments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDocuments.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-8 w-8 text-blue-600" />
                      <div>
                        <h4 className="font-medium text-gray-900">{document.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span>{getCategoryLabel(document.category)}</span>
                          <span>{document.size}</span>
                          <span>Uploaded {document.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    {document.extractedData && (
                      <div className="mt-3 ml-11">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h5 className="font-medium text-blue-900 mb-2">Extracted Information</h5>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(document.extractedData).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                <span className="font-medium">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(document.status)}
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                  <p className="text-gray-600">
                    {searchTerm || filterCategory !== 'all' 
                      ? 'Try adjusting your search or filter criteria'
                      : 'Upload your first document to get started'
                    }
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentsPage;
