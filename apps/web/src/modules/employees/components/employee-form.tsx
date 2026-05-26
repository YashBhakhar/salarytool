import { useForm } from "react-hook-form";

import Button
from "../../../components/common/button";

import Input
from "../../../components/common/input";

interface Props {
  defaultValues?: Record<string, unknown>;
  onSubmit: (data: unknown) => void;
  loading?: boolean;
}

export default function EmployeeForm({
  defaultValues,
  onSubmit,
  loading,
}: Props) {
  const { register, handleSubmit } =
    useForm({
      defaultValues,
    });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        placeholder="Full Name"
        {...register("full_name")}
      />

      <Input
        placeholder="Email"
        {...register("email")}
      />

      <Input
        placeholder="Country"
        {...register("country")}
      />

      <Input
        type="number"
        placeholder="Salary"
        {...register("salary", {
          valueAsNumber: true,
        })}
      />

      <Input
        placeholder="Job Title"
        {...register("job_title")}
      />

      <Input
        placeholder="Department"
        {...register("department")}
      />

      <Button type="submit">
        {loading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}