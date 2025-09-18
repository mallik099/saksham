import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Bus, Users, MapPin, Download, Plus, Clock, AlertTriangle, CheckCircle, 
  Navigation, Fuel, Wrench, Calendar, Phone, Mail, Route, TrendingUp,
  BarChart3, PieChart, Activity, Settings, Bell, FileText
} from 'lucide-react';

const EnhancedTransportManagement = () => {
  const [routes, setRoutes] = useState([
    {
      id: 'RT001',
      routeName: 'City Center Express',
      driver: 'Rajesh Kumar',
      driverPhone: '+91 9876543210',
      busNumber: 'KA-01-AB-1234',
      capacity: 50,
      currentOccupancy: 42,
      stops: ['City Center', 'Mall Road', 'Railway Station', 'Tech Hub', 'College'],
      fee: 2000,
      timing: { departure: '7:30 AM', arrival: '8:45 AM' },
      status: 'Active',
      fuelEfficiency: '12 km/l',
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-04-15',
      gpsLocation: { lat: 12.9716, lng: 77.5946 },
      students: [
        { rollNo: 'CS21001', name: 'John Doe', stop: 'City Center', feeStatus: 'Paid', phone: '+91 9876543211', boardingTime: '7:35 AM' },
        { rollNo: 'CS21002', name: 'Jane Smith', stop: 'Mall Road', feeStatus: 'Pending', phone: '+91 9876543212', boardingTime: '7:42 AM' },
        { rollNo: 'EC21003', name: 'Mike Johnson', stop: 'Railway Station', feeStatus: 'Paid', phone: '+91 9876543213', boardingTime: '7:50 AM' }
      ]
    },
    {
      id: 'RT002',
      routeName: 'Suburb Connect',
      driver: 'Suresh Patel',
      driverPhone: '+91 9876543220',
      busNumber: 'KA-01-CD-5678',
      capacity: 45,
      currentOccupancy: 38,
      stops: ['Suburb Area', 'Market Square', 'Bus Stand', 'Shopping Mall', 'College'],
      fee: 1800,
      timing: { departure: '7:45 AM', arrival: '9:00 AM' },
      status: 'Active',
      fuelEfficiency: '10 km/l',
      lastMaintenance: '2024-02-20',
      nextMaintenance: '2024-04-20',
      gpsLocation: { lat: 12.9352, lng: 77.6245 },
      students: []
    }
  ]);

  const [maintenanceRequests, setMaintenanceRequests] = useState([
    { id: 'MR001', busNumber: 'KA-01-EF-9012', issue: 'Engine overheating', priority: 'High', reportedBy: 'Amit Singh', date: '2024-03-01', status: 'In Progress', estimatedCost: 15000 },
    { id: 'MR002', busNumber: 'KA-01-AB-1234', issue: 'Brake pad replacement', priority: 'Medium', reportedBy: 'Rajesh Kumar', date: '2024-03-02', status: 'Pending', estimatedCost: 8000 },
    { id: 'MR003', busNumber: 'KA-01-CD-5678', issue: 'AC not working', priority: 'Low', reportedBy: 'Suresh Patel', date: '2024-03-03', status: 'Completed', estimatedCost: 12000 }
  ]);

  const [fuelRecords, setFuelRecords] = useState([
    { id: 'FR001', busNumber: 'KA-01-AB-1234', date: '2024-03-01', liters: 45, cost: 4050, mileage: 540, efficiency: '12 km/l' },
    { id: 'FR002', busNumber: 'KA-01-CD-5678', date: '2024-03-01', liters: 50, cost: 4500, mileage: 500, efficiency: '10 km/l' },
    { id: 'FR003', busNumber: 'KA-01-EF-9012', date: '2024-03-02', liters: 48, cost: 4320, mileage: 528, efficiency: '11 km/l' }
  ]);

  const [emergencyAlerts, setEmergencyAlerts] = useState([
    { id: 'EA001', busNumber: 'KA-01-AB-1234', type: 'Breakdown', location: 'Tech Hub Stop', time: '8:15 AM', status: 'Resolved', description: 'Flat tire fixed' },
    { id: 'EA002', busNumber: 'KA-01-CD-5678', type: 'Delay', location: 'Market Square', time: '7:55 AM', status: 'Active', description: 'Traffic jam - 15 min delay' }
  ]);

  const generateComprehensiveReport = () => {
    const totalRevenue = routes.reduce((sum, route) => sum + (route.fee * route.currentOccupancy), 0);
    const totalStudents = routes.reduce((sum, route) => sum + route.currentOccupancy, 0);
    const totalCapacity = routes.reduce((sum, route) => sum + route.capacity, 0);
    const occupancyRate = Math.round((totalStudents / totalCapacity) * 100);
    
    alert(`Comprehensive Transport Report:\n\nTotal Revenue: ₹${totalRevenue.toLocaleString()}\nTotal Students: ${totalStudents}\nOccupancy Rate: ${occupancyRate}%\nActive Routes: ${routes.filter(r => r.status === 'Active').length}\nMaintenance Pending: ${maintenanceRequests.filter(m => m.status === 'Pending').length}`);
  };

  const trackBusRealTime = (busNumber: string) => {
    const route = routes.find(r => r.busNumber === busNumber);
    if (route) {
      alert(`Real-time Tracking - ${busNumber}:\nLocation: ${route.gpsLocation.lat}°N, ${route.gpsLocation.lng}°E\nStatus: ${route.status}\nNext Stop: ${route.stops[1]}\nETA: 5 minutes`);
    }
  };

  const sendEmergencyAlert = (busNumber: string, alertType: string) => {
    const newAlert = {
      id: `EA${Date.now()}`,
      busNumber,
      type: alertType,
      location: 'Current Location',
      time: new Date().toLocaleTimeString(),
      status: 'Active',
      description: `${alertType} reported by driver`
    };
    setEmergencyAlerts(prev => [newAlert, ...prev]);
    alert(`Emergency alert sent for ${busNumber}!`);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Active Routes</p>
                <p className="text-2xl font-bold text-blue-900">{routes.filter(r => r.status === 'Active').length}</p>
              </div>
              <Bus className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Total Students</p>
                <p className="text-2xl font-bold text-green-900">
                  {routes.reduce((sum, route) => sum + route.currentOccupancy, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Monthly Revenue</p>
                <p className="text-2xl font-bold text-purple-900">
                  ₹{routes.reduce((sum, route) => sum + (route.fee * route.currentOccupancy), 0).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Occupancy Rate</p>
                <p className="text-2xl font-bold text-orange-900">
                  {Math.round((routes.reduce((sum, route) => sum + route.currentOccupancy, 0) / routes.reduce((sum, route) => sum + route.capacity, 0)) * 100)}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Alerts</p>
                <p className="text-2xl font-bold text-red-900">{emergencyAlerts.filter(a => a.status === 'Active').length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="routes" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="fuel">Fuel Management</TabsTrigger>
          <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
          <TabsTrigger value="alerts">Emergency Alerts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Route className="h-5 w-5" />
                  Route Management
                </span>
                <div className="flex gap-2">
                  <Button onClick={generateComprehensiveReport}>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {routes.map((route) => (
                  <div key={route.id} className="border rounded-lg p-6 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{route.routeName}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-sm text-gray-600">Driver: {route.driver}</p>
                          <p className="text-sm text-gray-600">Bus: {route.busNumber}</p>
                          <Badge variant={route.status === 'Active' ? 'default' : 'destructive'}>
                            {route.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-2 mb-2">
                          <Button size="sm" onClick={() => trackBusRealTime(route.busNumber)}>
                            <Navigation className="h-4 w-4 mr-1" />
                            Track
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-1" />
                            Call Driver
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">
                          {route.timing.departure} - {route.timing.arrival}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-blue-50 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold text-blue-600">{route.currentOccupancy}/{route.capacity}</p>
                        <p className="text-xs text-gray-600">Occupancy</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold text-green-600">₹{(route.fee * route.currentOccupancy).toLocaleString()}</p>
                        <p className="text-xs text-gray-600">Monthly Revenue</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold text-orange-600">{route.fuelEfficiency}</p>
                        <p className="text-xs text-gray-600">Fuel Efficiency</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg text-center">
                        <p className="text-lg font-bold text-purple-600">{route.stops.length}</p>
                        <p className="text-xs text-gray-600">Total Stops</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Route Stops & Timing
                      </h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        {route.stops.map((stop, index) => (
                          <div key={index} className="flex items-center">
                            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {stop}
                            </div>
                            {index < route.stops.length - 1 && (
                              <span className="mx-2 text-gray-400">→</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Maintenance Schedule</h4>
                        <div className="text-sm space-y-1">
                          <p>Last Service: {route.lastMaintenance}</p>
                          <p>Next Service: {route.nextMaintenance}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Driver Contact</h4>
                        <div className="text-sm space-y-1">
                          <p className="flex items-center gap-2">
                            <Phone className="h-3 w-3" />
                            {route.driverPhone}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Maintenance Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-lg">{request.busNumber}</h4>
                        <p className="text-sm text-gray-600">{request.issue}</p>
                        <p className="text-xs text-gray-500">Reported by: {request.reportedBy} on {request.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={
                          request.priority === 'High' ? 'destructive' : 
                          request.priority === 'Medium' ? 'default' : 'secondary'
                        }>
                          {request.priority} Priority
                        </Badge>
                        <p className="text-sm mt-1">Est. Cost: ₹{request.estimatedCost.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={
                        request.status === 'Completed' ? 'default' : 
                        request.status === 'In Progress' ? 'secondary' : 'destructive'
                      }>
                        {request.status}
                      </Badge>
                      {request.status === 'Pending' && (
                        <Button size="sm">Start Maintenance</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fuel" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fuel className="h-5 w-5" />
                Fuel Management & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{fuelRecords.reduce((sum, record) => sum + record.cost, 0).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Total Fuel Cost</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {fuelRecords.reduce((sum, record) => sum + record.liters, 0)}L
                  </p>
                  <p className="text-sm text-gray-600">Total Fuel Consumed</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-orange-600">
                    {Math.round(fuelRecords.reduce((sum, record) => sum + parseFloat(record.efficiency), 0) / fuelRecords.length)} km/l
                  </p>
                  <p className="text-sm text-gray-600">Average Efficiency</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {fuelRecords.map((record) => (
                  <div key={record.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <p className="font-medium">{record.busNumber}</p>
                        <p className="text-sm text-gray-600">{record.date}</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-blue-600">{record.liters}L</p>
                        <p className="text-xs text-gray-600">Fuel Added</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-green-600">₹{record.cost}</p>
                        <p className="text-xs text-gray-600">Cost</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-orange-600">{record.mileage} km</p>
                        <p className="text-xs text-gray-600">Distance</p>
                      </div>
                      <div className="text-center">
                        <p className="font-bold text-purple-600">{record.efficiency}</p>
                        <p className="text-xs text-gray-600">Efficiency</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Live Bus Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {routes.map((route) => (
                  <div key={route.id} className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg">{route.busNumber}</h4>
                        <p className="text-sm text-gray-600">{route.routeName}</p>
                      </div>
                      <Badge variant={route.status === 'Active' ? 'default' : 'destructive'}>
                        {route.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Current Location:</span>
                        <span className="text-sm font-medium">
                          {route.gpsLocation.lat}°N, {route.gpsLocation.lng}°E
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Next Stop:</span>
                        <span className="text-sm font-medium">{route.stops[1]}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">ETA:</span>
                        <span className="text-sm font-medium">5 minutes</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Speed:</span>
                        <span className="text-sm font-medium">45 km/h</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" onClick={() => trackBusRealTime(route.busNumber)} className="flex-1">
                        <Navigation className="h-4 w-4 mr-1" />
                        Track Live
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => sendEmergencyAlert(route.busNumber, 'Emergency')}>
                        <Bell className="h-4 w-4 mr-1" />
                        Alert
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Emergency Alerts & Incidents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emergencyAlerts.map((alert) => (
                  <div key={alert.id} className={`border rounded-lg p-4 ${
                    alert.status === 'Active' ? 'border-red-200 bg-red-50' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-lg">{alert.busNumber}</h4>
                        <p className="text-sm text-gray-600">{alert.type} at {alert.location}</p>
                        <p className="text-xs text-gray-500">{alert.time}</p>
                      </div>
                      <Badge variant={alert.status === 'Active' ? 'destructive' : 'default'}>
                        {alert.status}
                      </Badge>
                    </div>
                    <p className="text-sm mb-3">{alert.description}</p>
                    {alert.status === 'Active' && (
                      <div className="flex gap-2">
                        <Button size="sm">Dispatch Help</Button>
                        <Button size="sm" variant="outline">Contact Driver</Button>
                        <Button size="sm" variant="outline">Mark Resolved</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Transport Analytics & Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Route Performance</h4>
                  {routes.map((route) => (
                    <div key={route.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{route.routeName}</span>
                        <span className="text-sm text-gray-600">
                          {Math.round((route.currentOccupancy / route.capacity) * 100)}% occupied
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(route.currentOccupancy / route.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span>{route.currentOccupancy} students</span>
                        <span>₹{(route.fee * route.currentOccupancy).toLocaleString()} revenue</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Monthly Trends</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">95%</p>
                      <p className="text-sm text-gray-600">On-time Performance</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">₹2.8L</p>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-orange-600">11.5</p>
                      <p className="text-sm text-gray-600">Avg Fuel Efficiency</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-purple-600">163</p>
                      <p className="text-sm text-gray-600">Total Students</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedTransportManagement;