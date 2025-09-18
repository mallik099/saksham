import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { FileText, Download, Calendar, Award } from 'lucide-react';

const AdminCertificates = () => {
  const certificateRequests = [
    { id: 1, student: 'John Doe', rollNo: 'CS21001', type: 'Bonafide Certificate', requestDate: '2024-03-01', status: 'Pending', purpose: 'Bank Loan' },
    { id: 2, student: 'Jane Smith', rollNo: 'EC21002', type: 'Transfer Certificate', requestDate: '2024-03-02', status: 'Approved', purpose: 'College Transfer' },
    { id: 3, student: 'Mike Johnson', rollNo: 'ME21003', type: 'Character Certificate', requestDate: '2024-03-03', status: 'Pending', purpose: 'Job Application' }
  ];

  const certificateTypes = [
    { name: 'Bonafide Certificate', issued: 45, pending: 8, description: 'Proof of enrollment' },
    { name: 'Transfer Certificate', issued: 12, pending: 3, description: 'For college transfer' },
    { name: 'Character Certificate', issued: 28, pending: 5, description: 'Character verification' },
    { name: 'Degree Certificate', issued: 150, pending: 0, description: 'Graduation certificate' }
  ];

  const recentIssued = [
    { student: 'Sarah Wilson', rollNo: 'CS21004', type: 'Bonafide Certificate', issueDate: '2024-03-05', serialNo: 'BC2024001' },
    { student: 'David Brown', rollNo: 'EC21005', type: 'Character Certificate', issueDate: '2024-03-04', serialNo: 'CC2024015' },
    { student: 'Lisa Davis', rollNo: 'ME21006', type: 'Transfer Certificate', issueDate: '2024-03-03', serialNo: 'TC2024008' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Certificate Management</h2>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{certificateRequests.length}</p>
            <p className="text-sm text-gray-600">Total Requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">{certificateRequests.filter(c => c.status === 'Pending').length}</p>
            <p className="text-sm text-gray-600">Pending Approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">{certificateRequests.filter(c => c.status === 'Approved').length}</p>
            <p className="text-sm text-gray-600">Approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{certificateTypes.reduce((sum, type) => sum + type.issued, 0)}</p>
            <p className="text-sm text-gray-600">Total Issued</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Certificate Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certificateRequests.map((request) => (
                <div key={request.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{request.student}</h4>
                      <p className="text-sm text-gray-600">{request.rollNo}</p>
                      <p className="text-sm text-gray-600">{request.type}</p>
                    </div>
                    <Badge variant={request.status === 'Approved' ? 'default' : 'secondary'}>
                      {request.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Purpose: {request.purpose}</p>
                    <p>Requested: {request.requestDate}</p>
                  </div>
                  {request.status === 'Pending' && (
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="bg-green-600">Approve</Button>
                      <Button size="sm" variant="destructive">Reject</Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Certificate Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certificateTypes.map((type, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center p-2 bg-green-50 rounded">
                      <p className="font-bold text-green-600">{type.issued}</p>
                      <p className="text-gray-600">Issued</p>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded">
                      <p className="font-bold text-orange-600">{type.pending}</p>
                      <p className="text-gray-600">Pending</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recently Issued Certificates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIssued.map((certificate, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <h4 className="font-medium">{certificate.student}</h4>
                  <p className="text-sm text-gray-600">{certificate.rollNo}</p>
                  <p className="text-sm text-gray-600">{certificate.type}</p>
                  <p className="text-xs text-gray-500">Serial: {certificate.serialNo}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{certificate.issueDate}</p>
                  <Badge variant="default">Issued</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCertificates;