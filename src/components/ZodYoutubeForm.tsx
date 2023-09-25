import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

const schema = z.object({
    username:z.string().nonempty("Username is required"),
    email:z.string().nonempty("email is required").email("Email forma is not valid"),
    channel:z.string().nonempty("Channel is required")
})

type FormValues = {
  username: string;
  email: string;
  channel:string
};

const ZodYoutubeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      channel:"",
    },
    resolver:zodResolver(schema)
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

export default ZodYoutubeForm;
