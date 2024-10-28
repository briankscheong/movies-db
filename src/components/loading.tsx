"use client"
import "@/app/globals.css"
import {Spinner} from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex justify-center">
        <Spinner size="lg" color="primary" />
    </div>
  );
}