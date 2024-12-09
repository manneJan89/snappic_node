import { Router } from "express";
import Stream, { IStream } from "../models/Streams";

const router = Router();

/**
 * Calculate the total duration of all streams
*/
function calculateTotalDuration(streams: IStream[]) {
    let totalMinutes = 0;
  
    streams.forEach((stream) => {
      const streamStartDate = new Date(stream.startDate);
      const streamEndDate = new Date(stream.endDate);
  
      const startMinutes = timeToMinutes(stream.startTime);
      let endMinutes = timeToMinutes(stream.endTime);

      // If the stream spans into the next day, cap the end time to 23:59
      if (streamStartDate.toDateString() !== streamEndDate.toDateString()) {
        endMinutes = timeToMinutes('23:59');
      }
  
      totalMinutes += endMinutes - startMinutes;
    });
  
    return totalMinutes;
}

/**
 * Calculate the overlapping time between streams
 */
function calculateOverlappingTime(streams: IStream[]) {

    // Sort streams by start time
    const sortedStreams = streams.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
    let overlappingMinutes = 0;
    let lastEnd = 0;
    const overlappingStreams = new Set();
  
    sortedStreams.forEach((stream, index) => {
      const start = timeToMinutes(stream.startTime);
      const end = timeToMinutes(stream.endTime);
  
      if (start < lastEnd) {
        overlappingMinutes += Math.min(end, lastEnd) - start;

        // Mark current and previous stream as overlapping
        overlappingStreams.add(index);
        overlappingStreams.add(index - 1);
      }
  
      lastEnd = Math.max(lastEnd, end);
    });
  
    return {
        overlappingMinutes,
        overlappingStreamCount: overlappingStreams.size,
    };
}

/**
 * Calcuate the Effective duration by taking the total duration and subtracting the overlapping steam time
*/
function calculateEffectiveDuration(streams: IStream[]) {
    const totalMinutes = calculateTotalDuration(streams);
    const overlappingMinutes = calculateOverlappingTime(streams).overlappingMinutes;
    const effectiveMinutes = totalMinutes - overlappingMinutes;
    return effectiveMinutes;
}
  
/**
 * This Function will take the time in HH:MM format and return the total minutes
*/
function timeToMinutes(time: any) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
}
 
/**
 * This Function will take the total minutes and return the formatted duration as Xh Ym
 */
function formatDuration(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
}
  

router.get('/:date', async (req: any, res) => {

    try {
        const streams = await Stream.find({ startDate: req.params.date });

        if (!streams) {
            return res.status(404).json({ error: 'No Streams found' });
        }

        const streamData = {
            streams,
            totalDuration: formatDuration(calculateTotalDuration(streams)),
            effectiveDuration: formatDuration(calculateEffectiveDuration(streams)),
            overlappingStreams: calculateOverlappingTime(streams).overlappingStreamCount,
        }

        return res.status(200).json(streamData);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }

});

router.post('/', async (req: any, res) => {
    try {
        const stream = new Stream(req.body);

        await stream.save();
        res.status(201).json(stream);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
})


export default router;