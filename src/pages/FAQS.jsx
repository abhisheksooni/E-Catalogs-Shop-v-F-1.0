import React from 'react'
import { Helmet } from 'react-helmet';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

function FAQS() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Frequently asked questions</title>
            </Helmet>
            <section className='max-w-[1440px]   md:mx-auto  w-full px-5 xl:px-0 mb-24 '>
                {/* section  */}
                {/* section  */}
                <section className='bg-c7  mx-auto  w-full  rounded-3xl text-center py-14 my-6'>
                    <p className='text-c5 text-4xl font-semibold uppercase fixelMedium '>Frequently asked questions</p>
                </section>
                <section className='mt-20 max-w-[80rem] mx-auto *:rounded-2xl *:mb-4 *:py-4'>
                    <p className='text-4xl font-semibold text-center mb-8'>General</p>
                    <Accordion type="single" className='bg-c7 px-5' collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Is my personal information secure on your site?</AccordionTrigger>
                            <AccordionContent>
                                Yes, we take your privacy seriously. Our website uses advanced encryption protocols to secure your personal information, and we do not share your data with third parties.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" className='bg-c7 px-5' collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How can I reset my password?</AccordionTrigger>
                            <AccordionContent>
                                If you forget your password, click on the "Forgot Password" link on the login page. Follow the instructions in the email we send you to reset your password securely.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" className='bg-c7 px-5' collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                            <AccordionContent>
                                We accept a variety of payment methods, including credit cards, debit cards, and PayPal. You can find the full list of accepted payment methods during the checkout process.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </section>
                <section className='mt-24 max-w-[80rem] mx-auto *:rounded-2xl *:mb-4 *:py-4'>
                    <p className='text-4xl font-semibold text-center mb-8'>Shipping and returns</p>
                    <Accordion type="single" className='bg-c7 px-5' collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What are your shipping options and delivery times?</AccordionTrigger>
                            <AccordionContent>
                                We offer standard and express shipping options. Delivery times vary based on your location and the chosen shipping method. You can view estimated delivery times during the checkout process.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" className='bg-c7 px-5' collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>How can I track my order?</AccordionTrigger>
                            <AccordionContent>
                                Once your order is shipped, you will receive a tracking number via email. Use this number on our "Track Order" page to monitor the status and location of your shipment.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <Accordion type="single" className='bg-c7 px-5' collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger>What is your return policy?</AccordionTrigger>
                            <AccordionContent>
                                Our return policy allows you to return items within 30 days of purchase for a full refund. Please review our "Returns and Exchanges" page for detailed instructions and conditions.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                </section>
                <section></section>
            </section>
        </>
    )
}

export default FAQS