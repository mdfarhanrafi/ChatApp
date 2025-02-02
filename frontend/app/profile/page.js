"use client"
import React, { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import Loader from "@/components/loader"
import Navbar from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Camera, Mail, User } from "lucide-react";
const Chat = () => {
    const { authUser, isUpdatingProfile, updateProfile,isCheckingAuth, checkAuth } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const router = useRouter()
    useEffect(()=>{
          checkAuth()
      },[])
      useEffect(() => {
        if (!isCheckingAuth && !authUser) {
          router.push("/signin")
        }
        
      }, [authUser, isCheckingAuth, router])
      
      if (isCheckingAuth || !authUser) {
        return <Loader />
      }


   const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
 

  return (
    <div className="p-6 flex flex-col justify-center">
      <Navbar/>
      <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle>Profile</CardTitle>
          <p className="text-muted-foreground">Your profile information</p>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarImage src={selectedImg || authUser.profilePic || "https://github.com/shadcn.png" } alt="Profile" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-primary hover:bg-primary/90
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-primary-foreground" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </Label>
            </div>
            <p className="text-sm text-muted-foreground">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <Label className="text-muted-foreground flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <p className="px-4 py-2.5 bg-muted rounded-lg border">{authUser.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <Label className="text-muted-foreground flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <p className="px-4 py-2.5 bg-muted rounded-lg border">{authUser.email}</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b">
                <span>Member Since</span>
                <span>{authUser.createdAt.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}

export default Chat

