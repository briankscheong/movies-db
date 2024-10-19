"use client"
import "@/app/globals.css"
import { useEffect, useState } from "react";
import Loading from '@/components/loading';
import { waitSeconds } from "@/lib/utils";
import { Suspense } from "react";

export default function ContactUs() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        waitSeconds(1500)
        .then(()=> setLoading(false))
        .catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <Suspense key="contactUs" fallback={<Loading />}>
            <div>
                { 
                    loading ? <Loading></Loading> : (
                        <div className="flex items-center justify-center">
                            <h1>Coming soon!</h1>
                        </div>
                    ) 
                }
            </div>
        </Suspense>
    );
}