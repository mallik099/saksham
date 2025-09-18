import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { FileText, Download, Eye, Upload, Search, Calendar } from 'lucide-react';
import { toast } from 'sonner';

interface Document {
  id: number;
  name: string;
  type: 'Certificate' | 'ID Card' | 'Report' | 'Application' | 'Other';
  uploadDate: string;
  size: string;
  url: string;
  status: 'Available' | 'Processing' | 'Expired';
}

const mockDocuments: Document[] = [
  { id: 1, name: 'Bonafide Certificate', type: 'Certificate', uploadDate: '2024-01-15', size: '245 KB', url: 'https://drive.google.com/file/d/mock-bonafide-cert', status: 'Available' },
  { id: 2, name: 'Student ID Card', type: 'ID Card', uploadDate: '2024-01-10', size: '180 KB', url: 'https://drive.google.com/file/d/mock-id-card', status: 'Available' },
  { id: 3, name: 'Academic Transcript', type: 'Report', uploadDate: '2024-02-01', size: '320 KB', url: 'https://drive.google.com/file/d/mock-transcript', status: 'Available' },
  { id: 4, name: 'Fee Receipt - Jan 2024', type: 'Certificate', uploadDate: '2024-01-20', size: '156 KB', url: 'https://drive.google.com/file/d/mock-fee-receipt', status: 'Available' },
  { id: 5, name: 'Library Card', type: 'ID Card', uploadDate: '2024-01-05', size: '98 KB', url: 'https://drive.google.com/file/d/mock-library-card', status: 'Processing' }
];

const DocumentVault = ({ isAdmin = false }) => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');

  const handleDownload = (doc: Document) => {
    // Mock download - in real app would download from Google Drive
    toast.success(`Downloading ${doc.name}...`);
    
    // Create mock download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${doc.name}.pdf`;
    link.click();
  };

  const handleView = (doc: Document) => {
    // Mock view - in real app would open Google Drive viewer
    toast.success(`Opening ${doc.name} in viewer...`);
    window.open(doc.url, '_blank');
  };

  const handleUpload = () => {
    // Mock upload
    const newDoc: Document = {
      id: documents.length + 1,
      name: 'New Document',
      type: 'Other',
      uploadDate: new Date().toISOString().split('T')[0],
      size: '200 KB',
      url: 'https://drive.google.com/file/d/mock-new-doc',
      status: 'Processing'
    };
    setDocuments([...documents, newDoc]);
    toast.success('Document uploaded successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      Certificate: 'bg-blue-100 text-blue-800',
      'ID Card': 'bg-purple-100 text-purple-800',
      Report: 'bg-green-100 text-green-800',
      Application: 'bg-orange-100 text-orange-800',
      Other: 'bg-gray-100 text-gray-800'
    };
    return colors[type as keyof typeof colors] || colors.Other;
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  const documentTypes = ['All', 'Certificate', 'ID Card', 'Report', 'Application', 'Other'];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-blue-700">
            <FileText className="w-5 h-5 mr-2" />
            Document Vault
          </CardTitle>
          {isAdmin && (
            <Button onClick={handleUpload} size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          )}
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {documentTypes.map(type => (
              <Button
                key={type}
                variant={filterType === type ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{doc.name}</h4>
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getTypeColor(doc.type)}>{doc.type}</Badge>
                    <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-3">
                <div className="flex items-center mb-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  {doc.uploadDate}
                </div>
                <div>Size: {doc.size}</div>
              </div>
              
              {doc.status === 'Available' && (
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleView(doc)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(doc)}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              )}
              
              {doc.status === 'Processing' && (
                <div className="text-center text-sm text-yellow-600">
                  Document is being processed...
                </div>
              )}
            </div>
          ))}
        </div>
        
        {filteredDocuments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No documents found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentVault;