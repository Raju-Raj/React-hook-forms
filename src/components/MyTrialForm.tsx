import { DevTool } from '@hookform/devtools';
import React from 'react'
import { useForm } from 'react-hook-form';

type FormValues={
    username:string,
    email:string,
    phonenumbers:string[],
    password:string,
}

const MyTrialForm = () => {
    const form = useForm<FormValues>({
        defaultValues:{
            username:"",
            email:"",
            phonenumbers:["",""],
            password:"",
            
        }
    })
    const {register,control,formState,handleSubmit} = form;
    const {errors} = formState;
    const onSubmit = (values: FormValues) => {
        console.log("formValues",values)
    }
    console.log(errors)
  return (
    <div>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Username</label>
            <input type="text" {...register("username",{
                required:{
                    value:true,
                    message:"username is required"
                }
            })} />
            <p className='error'>{errors.username?.message}</p>

<label htmlFor="email">Email</label>
            <input type="text" {...register("email",{
                required:{
                    value:true,
                    message:"email is required"
                },
                pattern:{
                    value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message:"email is not valid"
                }
            })} />
            <p className='error'>{errors.email?.message}</p>

            <label htmlFor="phonenumbers">Primary PhoneNumber</label>
            <input type="text" {...register("phonenumbers.0",{
                required:{
                    value:true,
                    message:"primary phonenumber is required"
                }
            })} />
            <p className='error'>{errors.phonenumbers?.[0]?.message}</p>

            <label htmlFor="phonenumbers">Secondary PhoneNumber</label>
            <input type="text" {...register("phonenumbers.1")} />

<label htmlFor="password">Password</label>
            <input type="password" {...register("password",{
                required:{
                    value:true,
                    message:"password is required"
                },
                minLength:{
                    value:8,
                    message:"password should min 8 charcters"
                }
            })} />
            <p className='error'>{errors.password?.message}</p>

            <button type='submit'>Register</button>
        </form>
        <DevTool control={control}/>
    </div>
  )
}

export default MyTrialForm