"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

type UserInfoProps = {
  user: Session['user']
}

export default function UserInfo(props: UserInfoProps) {

  if (!props.user) return;

  return (
    <div>
      <div className="flex flex-col p-3 space-y-3 items-center border-2 rounded-md mx-2">
        <Avatar>
          <AvatarFallback>L</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span>
            Nome: {props.user.name === undefined ? "Não informado" : props.user.name}
          </span>
          <span>
            Email: {props.user.email}
          </span>
        </div>

        <div>
          <Button variant={"outline"} onClick={() => signOut()}>
            Sair
          </Button>
        </div>
      </div>
    </div>
  )
}