import React, { useState } from 'react'

const Clock = () => {

    const [days, setDays] = useState()
    const [hours, setHours] = useState()
    const [minutes, setMinutes] = useState()
    const [seconds, setseconds] = useState()

    let interval;
    const countDown = () => {
        const destination = new Date('June 23, 2023').getTime()
        interval = setInterval(() => {
            const now = new Date().getTime()
            const different = destination - now
            const days = Math.floor(different / (1000 * 60 * 60 *24))
            const hours = Math.floor(different % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
            const minutes = Math.floor(different % (1000 * 60 * 60) / (1000 * 60))
            const seconds = Math.floor(different % (1000 * 60) / 1000)

            if(destination < 0) clearInterval(interval.current)
            else{
                setDays(days)
                setHours(hours)
                setMinutes(minutes)
                setseconds(seconds)
            }
        })
    }

    countDown()
    
    return (
        <div className='d-flex aligns-items-center gap-3 mb-5'>
            <div className='d-flex aligns-items-center gap-3'>
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{days} </h1>
                    <h5 className='text-white fs-6'>Days </h5>
                </div>
                <span className='text-white fs-3'>:</span>
            </div>
            <div className='d-flex aligns-items-center gap-3'>
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{hours} </h1>
                    <h5 className='text-white fs-6'>Hours </h5>
                </div>
                <span className='text-white fs-3'>:</span>
            </div>
            <div className='d-flex aligns-items-center gap-3'>
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{minutes} </h1>
                    <h5 className='text-white fs-6'>Minutes </h5>
                </div>
                <span className='text-white fs-3'>:</span>
            </div>
            <div className='d-flex aligns-items-center gap-3'>
                <div className='text-center'>
                    <h1 className='text-white fs-3 mb-2'>{seconds} </h1>
                    <h5 className='text-white fs-6'>Seconds </h5>
                </div>
            </div>
        </div>
    )
}

export default Clock