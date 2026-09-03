export async function submitCustomizationRequest(request) {
  await new Promise((resolve) => window.setTimeout(resolve, 900))
  if (!request.email || !request.requirements)
    throw new Error('Unable to submit this request. Please review the form and try again.')
  return { success: true }
}
