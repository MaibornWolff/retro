export function calculateMilliseconds(minutes: number, seconds: number) {
  return (minutes * 60 + seconds) * 1000;
}
