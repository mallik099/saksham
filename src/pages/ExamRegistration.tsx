import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { examAPI } from "@/services/api";

export default function ExamRegistration() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    examName: "",
    examDate: "",
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await examAPI.submit(formData);
      toast({
        title: "Success",
        description: "Exam registration submitted successfully!",
      });
      setFormData({
        studentId: "",
        examName: "",
        examDate: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit exam registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-2">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Exam Registration</h1>
      </div>

      <Card className="bg-card shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-card-foreground">Register for Exam</CardTitle>
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
                <Label htmlFor="examName">Exam Name</Label>
                <Input
                  id="examName"
                  name="examName"
                  placeholder="e.g., Mathematics Midterm"
                  value={formData.examName}
                  onChange={handleInputChange}
                  required
                  className="bg-input border-border"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="examDate">Exam Date</Label>
                <Input
                  id="examDate"
                  name="examDate"
                  type="datetime-local"
                  value={formData.examDate}
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
              {isLoading ? "Registering..." : "Register for Exam"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}