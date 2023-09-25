import React,{useEffect} from "react";
import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phonenumber: string[];
  phone: { number: string }[];
  age: number;
  dob: Date;
};

const YouTubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "Raju",
      email: "",
      channel: "",
      social: {
        twitter: "",
        facebook: "",
      },
      phonenumber: ["", ""],
      phone: [{ number: "" }],
      age: 0,
      dob: new Date(),
    },
    // mode:"onBlur",
    // mode:"onTouched"
    // mode:"onChange"
    mode:"all"
  });
  // const form = useForm<FormValues>({
  //   defaultValues:async()=>{
  //     const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
  //     const data = await response.json()
  //     return{
  //       username:"Raju",
  //       email:data.email,
  //       channel:""
  //     }
  //   }
  // });
  const { register, control, handleSubmit, formState,getValues,setValue,watch,reset,trigger } = form;
  // const {name,ref,onChange,onBlur} = register("username")
  const { fields, append, remove } = useFieldArray({ name: "phone", control });
  const { errors,dirtyFields,touchedFields,isDirty,isValid,isSubmitting,isSubmitted,isSubmitSuccessful,submitCount } = formState;
  console.log(isSubmitting,isSubmitted,isSubmitSuccessful,submitCount)
  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted : ", data);
  };

  const onError = (errors:FieldErrors<FormValues>) => {
    console.log("Errors : ",errors)
  }

  const handleGetValues = () => {
    console.log(getValues())
    console.log(getValues('username'))
    console.log(getValues('social.facebook'))
  }

  const handleSetValue = () => {
    setValue("channel","RajuBojja",{
      shouldDirty:true,
      shouldTouch:true,
      shouldValidate:true
    })
  }

  useEffect(() => {
    if(isSubmitSuccessful){
      reset()
    }
  }, [isSubmitSuccessful,reset])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit,onError)} noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "Username Is Required",
            },
          })}
        />
        <p className="error">{errors.username?.message}</p>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid Email Pattern",
            },
            required: {
              value: true,
              message: "Email is Required",
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue !== "admin@example.com" ||
                  "Enter a diffrent email address"
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith("baddomain.com") ||
                  "This domain is not supported"
                );
              },
              emailAvailable:async (fieldValue) => {
                const response = await fetch(
                  `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                );
                const data = await response.json();
                return data.length === 0 || "Email already exists"
              }
            },
          })}
        />
        <p className="error">{errors.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel", {
            required: {
              value: true,
              message: "Channel Is Required",
            },
          })}
        />
        <p className="error">{errors.channel?.message}</p>

        <label htmlFor="twitter">Twitter</label>
        <input type="text" id="twitter" {...register("social.twitter",{
          // disabled:watch("channel")==="",
          disabled:true
        })} />

        <label htmlFor="facebook">Facebook</label>
        <input type="text" id="facebook" {...register("social.facebook")} />

        <label htmlFor="primary-phone">Primary phone number</label>
        <input type="text" id="primary-phone" {...register("phonenumber.0")} />

        <label htmlFor="secondary-phone">Secondary phone number</label>
        <input
          type="text"
          id="secondary-phone"
          {...register("phonenumber.1")}
        />

        <label>List of phone numbers</label>
        {fields.map((field, index) => (
          <React.Fragment key={index}>
            <input
              type="text"
              {...register(`phone.${index}.number` as const)}
            />
            {index > 0 && (
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            )}
          </React.Fragment>
        ))}

        <button type="button" onClick={() => append({ number: "" })}>
          {" "}
          Add Phone Number
        </button>

        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          {...register("age", {
            valueAsNumber: true,
            required: {
              value: true,
              message: "Age Is Required",
            },
          })}
        />
        <p className="error">{errors.age?.message}</p>

        <label htmlFor="dob">DOB</label>
        <input
          type="date"
          id="dob"
          {...register("dob", {
            valueAsDate: true,
            required: {
              value: true,
              message: "DOB Is Required",
            },
          })}
        />
        <p className="error">{errors.dob?.message}</p>

        {/* <button type="submit" disabled={!isDirty || !isValid || isSubmitting}>Submit</button> */}
        <button type="submit" disabled={!isDirty  || isSubmitting}>Submit</button>
        <button type="button" onClick={()=>reset()}>Reset</button>
        <button type="button" onClick={handleGetValues}>GetValues</button>
        <button type="button" onClick={handleSetValue}>SetValue</button>
        <button type="button" onClick={()=>trigger("channel")}>Validate</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YouTubeForm;
