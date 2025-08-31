import { Card, CardContent, CardHeader, CardTitle } from "../esg-reports/ui/card"
import { Badge } from "../esg-reports/ui/badge"
import { Button } from "../esg-reports/ui/button"
import { Building2, MapPin, Phone, Mail, Globe, Users } from "lucide-react"
import Image from "next/image"

export function UserProfile() {
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <Image src="/images/sabah-port-logo.png" alt="Sabah Port Logo" fill className="object-contain" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-foreground">Sabah Ports Sdn Bhd</CardTitle>
            <p className="text-sm text-muted-foreground font-medium">Your Ports of Preference</p>
            <Badge variant="secondary" className="mt-2">
              Premium ESG Partner
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Port Authority</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Kota Kinabalu, Sabah</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">1,200+ Employees</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">www.sabahports.com.my</span>
          </div>
        </div>

        <div className="pt-2 border-t">
          <h4 className="font-semibold text-sm mb-2">ESG Compliance Status</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
              SDG 9 Compliant
            </Badge>
            <Badge variant="default" className="bg-blue-100 text-blue-800 border-blue-200">
              SDG 14 Aligned
            </Badge>
            <Badge variant="default" className="bg-purple-100 text-purple-800 border-purple-200">
              ISO 14001 Certified
            </Badge>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Mail className="w-4 h-4 mr-2" />
            Contact
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Phone className="w-4 h-4 mr-2" />
            Support
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
