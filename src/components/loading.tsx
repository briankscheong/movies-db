"use client"
import "@/app/globals.css"
import {Button} from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex justify-center">
        <Button className="bg-transparent" isLoading></Button>
    </div>
  );
}