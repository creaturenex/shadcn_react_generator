"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import convertImage from "@/utils/convertImage"
import LoadingSpinner from "./LoadingSpinner"

const formSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((files) => files?.length === 1, 'Please select one file.')
    .transform(files => files[0])
});

type FormValues = z.infer<typeof formSchema>;

export default function FileUpload() {
  const [generatedUI, setGeneratedUI] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true)
    setGeneratedUI(null)

    try {
      const convertedFile = await convertImage(values.file!)

      // Call generate-ui API
      const generateResponse = await fetch('/api/generate-ui', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file: convertedFile }),
      })

      if (!generateResponse.ok) {
        const errorText = await generateResponse.text()
        throw new Error(`HTTP error! status: ${generateResponse.status}, body: ${errorText}`)
      }

      const generateResult = await generateResponse.json()
      setGeneratedUI(generateResult.uiCode)
    } catch (error) {
      console.error('Error:', error)
      form.setError('root', {
        type: 'manual',
        message: error instanceof Error ? error.message : 'Failed to generate UI. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card className="grid w-full max-w-sm items-center gap-1.5 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files)}
                      accept="image/*"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  Generating <LoadingSpinner />
                </>
              ) : 'Generate UI'}
            </Button>
            <FormMessage />
          </form>
        </Form>
      </Card>
      {generatedUI && (
        <Card className="mt-4 max-w-screen-lg">
          <CardHeader>
            <CardTitle>Generated Shadcn UI Code</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto">{generatedUI}</pre>
          </CardContent>
        </Card>
      )}
    </>
  )
}
// https://medium.com/@damien_16960/input-file-x-shadcn-x-zod-88f0472c2b81