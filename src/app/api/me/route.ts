import { NextResponse } from "next/server"
import { requireAuthApi } from "@/components/auth/require-auth"
import { prisma } from "@/lib/prisma"
import { ApiError } from "@/lib/utils"
import { UpdateUserSchema } from "@/types/api"

export async function GET() {
  const { session, error } = await requireAuthApi()
  if (error) return error

  return NextResponse.json({
    session,
  })
}

export async function PATCH(request: Request) {
  const { session, error } = await requireAuthApi()
  if (error) return error

  const body = await request.json()
  const bodyParsedResult = UpdateUserSchema.safeParse(body)
  if (!bodyParsedResult.success) return ApiError(bodyParsedResult.error.message, { status: 400 })
  const bodyParsed = bodyParsedResult.data

  //* Update the user
  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      username: bodyParsed.username,
    },
  })

  return NextResponse.json({
    success: true,
  })
}
