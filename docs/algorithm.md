# Algorithm Documentation

This document explains the methods used to calculate the **total duration**, **overlapping time**, and **effective duration** of streams in a day. Each method handles potential overlaps and streams that span multiple days.

---

## `calculateTotalDuration`

### Description

Calculates the total duration of all streams in minutes, regardless of overlaps. If a stream spans into the next day, the duration is capped to end at `23:59` of the same day.

### Parameters

- `streams: IStream[]`: An array of streams, where each stream contains:
  - `startDate` (string): The start date of the stream in `YYYY-MM-DD` format.
  - `startTime` (string): The start time of the stream in `HH:mm` format.
  - `endDate` (string): The end date of the stream in `YYYY-MM-DD` format.
  - `endTime` (string): The end time of the stream in `HH:mm` format.

### Returns

- `number`: The total duration of all streams in minutes.

### Algorithm

1. Initialize `totalMinutes` to 0.
2. Iterate through each stream in the `streams` array:
   - Parse `startDate` and `endDate` into `Date` objects.
   - Convert `startTime` and `endTime` into total minutes using `timeToMinutes`.
   - If the stream spans into the next day, cap the `endTime` to `23:59`.
   - Calculate the stream's duration (`endMinutes - startMinutes`) and add it to `totalMinutes`.
3. Return `totalMinutes`.

### Example

```javascript
const streams = [
  { startDate: '2021-02-01', startTime: '12:00', endDate: '2021-02-01', endTime: '13:00' },
  { startDate: '2021-02-01', startTime: '22:00', endDate: '2021-02-02', endTime: '01:00' }
];

const totalDuration = calculateTotalDuration(streams); // Output: 120 minutes

---

## `calculateOverlappingTime`

### Description

Calculates the total overlapping time between streams and counts the number of unique streams that overlap.

### Parameters

- `streams: IStream[]`: An array of streams, where each stream contains:
  - `startTime` (string): The start time of the stream in `HH:mm` format.
  - `endTime` (string): The end time of the stream in `HH:mm` format.

### Returns

- `Object`: An object containing
  - `overlappingMinutes`: number: Total overlapping time in minutes.
  - `overlappingStreamCount`: number: Total number of unique streams that overlap.

### Algorithm

1. Sort the streams array by startTime.
2. Initialize:
   - `overlappingMinutes` to 0.
   - `lastEnd` to 0.
   - `overlappingStreams` as a `Set` to track unique overlapping streams.
3. Iterate through each stream:
  - Convert `startTime` and `endTime` into total minutes using `timeToMinutes`.
  - If the stream `start` is less than `lastEnd`, calculate the overlapping time (`Math.min(end, lastEnd) - start`) and add it to `overlappingMinutes`.
  - Add the current and previous streams to `overlappingStreams`.
  - Update `lastEnd` to the maximum of its current value or the stream `end`.
4. Return an object with `overlappingMinutes` and `overlappingStreamCount`.

### Example

```javascript
const streams = [
  { startTime: '12:00', endTime: '13:00' },
  { startTime: '12:30', endTime: '13:30' },
  { startTime: '13:15', endTime: '14:15' }
];

const { overlappingMinutes, overlappingStreamCount } = calculateOverlappingTime(streams);

---

## `calculateEffectiveDuration`

### Description

Calculates the effective duration of all streams by subtracting overlapping time from the total duration.

### Parameters

- `streams: IStream[]`: An array of streams, where each stream contains:
  - `startDate` (string): The start date of the stream in `YYYY-MM-DD` format.
  - `startTime` (string): The start time of the stream in `HH:mm` format.
  - `endDate` (string): The end date of the stream in `YYYY-MM-DD` format.
  - `endTime` (string): The end time of the stream in `HH:mm` format.

### Returns

- `number`: The effective duration of all streams in minutes.

### Algorithm

1. Call `calculateTotalDuration` to compute the total duration of all streams.
2. Call `calculateOverlappingTime` to compute the total overlapping time.
3. Subtract the overlapping time from the total duration to compute the effective duration.
4. Return the effective duration.

### Example

```javascript
const streams = [
  { startDate: '2021-02-01', startTime: '12:00', endDate: '2021-02-01', endTime: '13:00' },
  { startDate: '2021-02-01', startTime: '12:30', endDate: '2021-02-01', endTime: '13:30' },
  { startDate: '2021-02-01', startTime: '13:15', endDate: '2021-02-01', endTime: '14:15' }
];

const effectiveDuration = calculateEffectiveDuration(streams); // Output: 135 minutes

---

## Supporting Method: `timeToMinutes`

### Description

Converts a time string in `HH:mm` format into total minutes since midnight.

### Parameters

- `time`: string: A time string in `HH:mm` format.

### Returns

- `number`: Total minutes since midnight.

### Example

```javascript
const minutes = timeToMinutes('12:30'); // Output: 750