import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { X, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";

export interface PatientData {
  fullName: string;
  dateOfBirth: string;
  patientId: string;
  allergies: string[];
  conditions: string[];
  primaryCarePhysician: string;
}

interface PatientProfileProps {
  isOpen: boolean;
  onClose: () => void;
  patientData: PatientData | null;
}

export function PatientProfile({ isOpen, onClose, patientData }: PatientProfileProps) {
  if (!patientData) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Patient Profile</SheetTitle>
          <SheetDescription className="sr-only">
            View patient demographics, allergies, medical conditions, and healthcare context
          </SheetDescription>
        </SheetHeader>

        <div className="mt-2 space-y-6 p-[16px]">
          {/* Demographics */}
          <div>
            <h3 className="mb-3">Demographics</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground">Full Name</label>
                <p>{patientData.fullName}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Date of Birth</label>
                <p>{patientData.dateOfBirth}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Patient ID / Member ID</label>
                <p>{patientData.patientId}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Critical Alerts */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <h3 className="text-destructive">Critical Alerts</h3>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground">Allergies</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {patientData.allergies.length > 0 ? (
                    patientData.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive">
                        {allergy}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">None reported</p>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Key Medical Conditions</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {patientData.conditions.length > 0 ? (
                    patientData.conditions.map((condition, index) => (
                      <Badge key={index} variant="secondary">
                        {condition}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">None reported</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Context */}
          <div>
            <h3 className="mb-3">Healthcare Context</h3>
            <div>
              <label className="text-sm text-muted-foreground">Primary Care Physician</label>
              <p>{patientData.primaryCarePhysician}</p>
            </div>
          </div>

          <Separator />

          {/* Optional Link */}
          <div>
            <Button variant="outline" className="w-full">
              View Full EMR/Profile
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
