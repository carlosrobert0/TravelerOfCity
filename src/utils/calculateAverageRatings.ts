export function calculateAverageRatings(data: any) {
  if (data?.length === 0) {
    return 0
  }

  const sumRatings = data?.reduce(
    (accumulator: any, item: any) => accumulator + item.avaliation,
    0,
  )

  const average = sumRatings / data?.length

  const averageFormatted = average.toFixed(1).toString().replace('.', ',')

  return averageFormatted
}
