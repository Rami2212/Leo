/** @format */

import Events from "../models/eventsModels";
import { IEvent } from "../interfaces/index";

const createEventRepo = async (event: IEvent) => {
  try {
    const newEvent = new Events(event);
    await newEvent.save();
  } catch (error) {
    throw new Error("Error creating event");
  }
};

const findEventByIdRepo = async (id: string) => {
  try {
    const event = await Events.find({ _id: id });
    if (event.length === 0) {
      return null;
    }
    return event;
  } catch (error) {
    throw new Error("Error finding event by id");
  }
};
const findAllEventsRepo = async () => {
  try {
    const events = await Events.find();
    if (events.length === 0) {
      return null;
    }
    return events;
  } catch (error) {
    throw new Error("Error finding all events");
  }
};
const findEventByDateRepo = async (date: string) => {
  try {
    const events = await Events.find({ date });
    if (events.length === 0) {
      return null;
    }
    return events;
  } catch (error) {}
};
const updateEventRepo = async (id: string, event: IEvent) => {
  try {
    const updateEvent = await Events.findByIdAndUpdate(id, event, {
      new: true,
    });
    if (!updateEvent) {
      return null;
    }
    return updateEvent;
  } catch (error) {
    throw new Error("Error updating event");
  }
};
const deleteEventRepo = async (id: string) => {
  try {
    const deleteEvent = await Events.findByIdAndDelete(id);
    if (!deleteEvent) {
      return null;
    }
    return deleteEvent;
  } catch (error) {
    throw new Error("Error deleting event");
  }
};
export {
  createEventRepo,
  findEventByIdRepo,
  findAllEventsRepo,
  findEventByDateRepo,
  updateEventRepo,
  deleteEventRepo,
};
