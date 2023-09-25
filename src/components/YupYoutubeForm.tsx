import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    username:yup.string().required("Username is required"),
    email:yup.string().email("Email format is not valid").required("Email is required"),
    channel:yup.string().required("Username is required"),
})

type FormValues = {
  username: string;
  email: string;
  channel:string
};

const YupYoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel:"",
    },
    resolver:yupResolver(schema)
  });
  const { register, control, formState, handleSubmit } = form;
  const { errors } = formState;
  const onSubmit = (values: FormValues) => {
    console.log("formValues", values);
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          {...register("username")}
        />
        <p className="error">{errors.username?.message}</p>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          {...register("email")}
        />
        <p className="error">{errors.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register("channel")}
        />
        <p className="error">{errors.channel?.message}</p>

        <button type="submit">Register</button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default YupYoutubeForm;
