import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { libraryAPI } from "@/services/api";

export default function LibraryManagement() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    bookId: "",
    action: "",
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
      await libraryAPI.submit(formData);
      toast({
        title: "Success",
        description: `Book ${formData.action} successfully processed!`,
      });
      setFormData({
        studentId: "",
        bookId: "",
        action: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process library transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-2">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Library Management</h1>
      </div>

      <Card className="bg-card shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-card-foreground">Book Borrow/Return Form</CardTitle>
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
                <Label htmlFor="bookId">Book ID</Label>
                <Input
                  id="bookId"
                  name="bookId"
                  placeholder="Enter book ID"
                  value={formData.bookId}
                  onChange={handleInputChange}
                  required
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="action">Action</Label>
                <Select onValueChange={(value) => handleSelectChange(value, "action")} required>
                  <SelectTrigger className="bg-input border-border">
                    <SelectValue placeholder="Select action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="borrow">Borrow</SelectItem>
                    <SelectItem value="return">Return</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Processing..." : `${formData.action ? formData.action.charAt(0).toUpperCase() + formData.action.slice(1) : "Submit"} Book`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}