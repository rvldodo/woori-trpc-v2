"use client";

import { schema } from "@/server/api/schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Schema = z.infer<typeof schema.form.loan>;

export default function NewCarForm() {
  const { handleSubmit, control, register } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema.form.loan),
  });

  return (
    <form onSubmit={() => {}} className="w-full pt-10 flex flex-col gap-5">
      <Controller
        name="lokasi"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-3">
            <Label>Your Location</Label>
            <Select
              value={field.value?.toString()}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose you location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ambon">Ambon</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <Controller
        name="cabang"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-3">
            <Label>Branch Location</Label>
            <Select
              value={field.value?.toString()}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose branch location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ambon">Ambon</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <div className="flex md:flex-row flex-col items-center gap-3">
        <Controller
          name="cabang"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-3 w-full">
              <Label>Branch Location</Label>
              <Select
                value={field.value?.toString()}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose branch location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ambon">Ambon</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        />

        <Controller
          name="cabang"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-3 w-full">
              <Label>Branch Location</Label>
              <Select
                value={field.value?.toString()}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose branch location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ambon">Ambon</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        />
      </div>

      <Controller
        name="cabang"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-3 w-full">
            <Label>Branch Location</Label>
            <Select
              value={field.value?.toString()}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose branch location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ambon">Ambon</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <Controller
        name="cabang"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-3">
            <Label>Branch Location</Label>
            <Select
              value={field.value?.toString()}
              onValueChange={field.onChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose branch location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ambon">Ambon</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      />

      <div className="flex flex-col gap-3">
        <Label>Branch Location</Label>
        <Input placeholder="Contoh" className="w-full" />
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
        <Controller
          name="cabang"
          control={control}
          render={({ field }) => (
            <div className="col-span-1 flex flex-col gap-3">
              <Label>Branch Location</Label>
              <Select
                value={field.value?.toString()}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose branch location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ambon">Ambon</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        />

        <div className="col-span-2 flex flex-col gap-3">
          <Label>Branch Location</Label>
          <Input placeholder="Contoh" className="w-full" />
        </div>
      </div>

      <div className="w-full flex justify-end">
        <Button className="right-0">Estimate Loan</Button>
      </div>
    </form>
  );
}
