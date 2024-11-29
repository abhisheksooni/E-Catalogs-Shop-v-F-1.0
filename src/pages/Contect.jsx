import React, { useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'

import { Helmet } from 'react-helmet';
import { Clock3, Phone, Mail, MapPin } from 'lucide-react';
import toast from 'react-hot-toast'

function Contect() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [message, setMessage] = useState("")

    const SubmitHandler = (e) => {
        e.preventDefault();

        let isFormValid = true;

        // Check if each field is empty and auto-fill with placeholder text if necessary
        if (name.length === 0) {
            setName("Please fill this field");
            isFormValid = false;
        }

        if (email.length === 0) {
            setEmail("Please fill this field");
            isFormValid = false;
        }

        if (number.length === 0) {
            setNumber("Please fill this field");
            isFormValid = false;
        }

        if (message.length === 0) {
            setMessage("Please fill this field");
            isFormValid = false;
        }

        // If all fields are filled, display success toast
        if (isFormValid) {
            toast.success("Message sent successfully!");
        } else {
            toast.error("Some fields were empty. Please fill them.");
        }
    };

    console.log(name);


    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Contect</title>
            </Helmet>
            <section className='max-w-[1440px] mx-auto  w-full px-5 xl:px-0 mb-10 '>
                {/* section  */}
                <section className='bg-c7  mx-auto  w-full  rounded-3xl text-center py-14 my-6'>
                    <p className='text-c5 text-4xl font-semibold uppercase fixelMedium '>Contects Us</p>
                </section>
                <section className=' w-full mx-auto mt-10'>
                    <section className=' flex lg:*:w-[50%] justify-between  flex-col xl:flex-row'>
                        <div className=" *:mb-8 lg:*:mb-10">

                            <p className=' text-6xl lg:text-8xl lg:leading-[95px] fixelMedium text-center lg:text-start'>Getting in touch is easy!</p>

                            <div className="flex gap-3 items-center text-center md:items-start md:text-start flex-col md:flxe-row">
                                <div className="bg-c7 rounded-xl p-4  ">
                                    <img className='w-6' src="https://cdn.prod.website-files.com/6607ad03b43fbbc8045dfbf0/660cd4981263f710cbf19273_location.svg" alt="" />
                                </div>
                                <div className="">
                                    <p className='text-xl fixelMedium'>Find Us</p>
                                    <p >UP, Jhansi, Shivpuri Bajar</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center text-center md:items-start md:text-start flex-col md:flxe-row">
                                <div className="bg-c7 rounded-xl p-4  ">
                                    <img className='w-6' src="https://cdn.prod.website-files.com/6607ad03b43fbbc8045dfbf0/660cd4b5b2504b903f64b203_call.svg" alt="" />
                                </div>
                                <div className="">
                                    <p className='text-xl fixelMedium'>Call Us</p>
                                    <p >+91 88888 88888</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center text-center md:items-start md:text-start flex-col md:flxe-row">
                                <div className="bg-c7 rounded-xl p-4  ">
                                    <img className='w-6' src="https://cdn.prod.website-files.com/6607ad03b43fbbc8045dfbf0/660cd4a6dc88c6a24b5b9ff6_mail.svg" alt="" />
                                </div>
                                <div className="">
                                    <p className='text-xl fixelMedium'>Email Us</p>
                                    <p >abhisheksoni.as444@gmail.com</p>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <p className='fixelMedium text-xl text-center lg:text-start'>Been tearing your hair out to find the perfect gift for your loved ones? Try visiting our nationwide local stores. You can also contact us to become a partner or distributor. Call us, send us an email, or make an appointment now.</p>

                            <div className=" flex gap-5 my-7 justify-center lg:justify-start">
                                <div className="bg-c7 rounded-xl p-8  "></div>
                                <div className="bg-c7 rounded-xl p-8  "></div>
                                <div className="bg-c7 rounded-xl p-8  "></div>
                                <div className="bg-c7 rounded-xl p-8  "></div>
                            </div>


                            <form className='*:mb-4 mt-10' onSubmit={SubmitHandler}>
                                <div className="grid w-full max-w-sm items-center gap-1.5 ">
                                    <Label htmlFor="text"  >Name</Label>
                                    <Input type="text" id="text" placeholder="Enter Your Name" onChange={(e) => setName(e.target.value)} value={name} className=" py-7 px-3" />
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5 ">
                                    <Label htmlFor="email"  >Email</Label>
                                    <Input type="email" id="email" placeholder="Enter Your Email"  onChange={(e) => setEmail(e.target.value)}
                                        value={email} className="py-7 px-3" />
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5 ">
                                    <Label htmlFor="text"  >Number</Label>
                                    <Input type="text" id="text" placeholder="Enter Your Number"  onChange={(e) => setNumber(e.target.value)}
                                        value={number} className="py-7 px-3 " />
                                </div>
                                <div className="grid w-full gap-1.5">
                                    <Label htmlFor="message-2">Message</Label>
                                    <Textarea placeholder="Enter Your Message" id="message-2"  onChange={(e) => setEmail(e.target.value)}
                                        value={message} className="py-7 px-3 w-96 text-base" />
                                </div>

                                <Button className="rounded-3xl px-10">
                                    Submit
                                </Button>
                            </form>

                        </div>
                    </section>

                </section>
            </section>
        </>
    )
}

export default Contect