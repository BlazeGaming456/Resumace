import React from 'react'

const AiGeneration = () => {

    return (
        <form>
            <div>
                <h2>Personal Details</h2>
                <input type="text" {...register('personalDetails')} placeholder='Mention your name, email, social media handles, etc.' />
            </div>
            <div>
                <h2>W</h2>
                <input type="text" {...register('personalDetails')} placeholder='Mention your name, email, social media handles, education, etc.' />
            </div>
            <div>
                <h2>Personal Details</h2>
                <input type="text" {...register('personalDetails')} placeholder='Mention your name, email, social media handles, education, etc.' />
            </div>
            <div>
                <h2>Personal Details</h2>
                <input type="text" {...register('personalDetails')} placeholder='Mention your name, email, social media handles, education, etc.' />
            </div>
        </form>
    )
}

export default AiGeneration