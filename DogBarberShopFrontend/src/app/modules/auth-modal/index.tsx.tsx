"use client";
import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useSession } from "../../contexts/session-context";
import useStore from "@/stores/useStore";

export default function AuthDialog() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
//   const { session, setSession } = useSession();

  

  const { setUser, setSession, setClientId, clientId } = useStore();


  const handleSubmit = async () => {
    setErrorMessage(""); // Clear any previous error messages
    const body = {
      email,
      password,
      firstName: firstName,
      userName: userName,
    };

    try {
      const response = await fetch(
        `/api/${isRegister ? "register" : "login"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();
      if (response.ok) {
        const { firstName } = data;
        const expiration = new Date(new Date().getTime() + 30 * 60000).toUTCString();
        document.cookie = `session=${firstName}; expires=${expiration}; path=/`;
        setSession(true);
        setUser(firstName);
        setClientId(data.clientId);
        alert(isRegister ? "נרשמת בהצלחה!" : "התחברת בהצלחה!");
      } else {
        setErrorMessage(data.error || "משהו השתבש, נסה שנית.");
      }
    } catch (error) {
      setErrorMessage("שגיאת תקשורת, אנא נסה שוב מאוחר יותר.");
    }
  };

  const toggleRegister = () => {
    setIsRegister(!isRegister);
    setErrorMessage(""); 
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-[200px]">כניסה / הרשמה</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="!text-center">
          <DialogTitle>{isRegister ? "הרשמה" : "כניסה"}</DialogTitle>
          <DialogDescription>
            {isRegister ? "צור חשבון חדש" : "אנא היכנס לחשבונך"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="אימייל"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="סיסמה"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="שם פרטי"
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {isRegister && (
            <Input
              placeholder="שם משתמש"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          )}
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
        <div className="mt-4 flex flex-col space-y-2">
          <Button onClick={handleSubmit}>
            {isRegister ? "הרשמה" : "כניסה"}
          </Button>
          <Button variant="outline" onClick={toggleRegister}>
            {isRegister ? "כבר יש לך חשבון? כניסה" : "אין לך חשבון? הרשמה"}
          </Button>
        </div>
        <DialogClose asChild>
          <Button variant="ghost" className="mt-4">
            סגור
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

