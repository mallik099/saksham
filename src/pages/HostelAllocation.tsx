import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { hostelAPI } from "@/services/api";

export default function HostelAllocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    roomNumber: "",
    block: "",
    allocationDate: new Date().toISOString().split("T")[0],
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await hostelAPI.submit(formData);
      toast({
        title: "Success",
        description: "Hostel allocation submitted successfully!",
      });
      setFormData({
        studentId: "",
        roomNumber: "",
        block: "",
        allocationDate: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit hostel allocation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-2">
        <Building className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Hostel Allocation</h1>
      </div>

      <Card className="bg-card shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-card-foreground">Room Assignment Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  id="studentId"
                  name="studentId"
                  placeholder="Enter student ID"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  required
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  name="roomNumber"
                  placeholder="e.g., 101"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  required
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="block">Block</Label>
                <Select onValueChange={(value) => handleSelectChange(value, "block")} required>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select block" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Block A</SelectItem>
                    <SelectItem value="B">Block B</SelectItem>
                    <SelectItem value="C">Block C</SelectItem>
                    <SelectItem value="D">Block D</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allocationDate">Allocation Date</Label>
                <Input
                  id="allocationDate"
                  name="allocationDate"
                  type="date"
                  value={formData.allocationDate}
                  onChange={handleInputChange}
                  required
                  className="bg-input border-border"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Allocating..." : "Allocate Room"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}