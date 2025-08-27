import { type User, type InsertUser, type ContactSubmission, type InsertContactSubmission, type Event, type InsertEvent, users, contactSubmissions, events } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  // Event management
  createEvent(event: InsertEvent): Promise<Event>;
  getEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contactSubmissions: Map<string, ContactSubmission>;
  private events: Map<string, Event>;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.events = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = randomUUID();
    const submission: ContactSubmission = { 
      ...insertSubmission, 
      id,
      createdAt: new Date()
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  // Event management methods
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = { 
      ...insertEvent,
      id,
      prize: insertEvent.prize || null,
      speaker: insertEvent.speaker || null,
      progress: insertEvent.progress || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.events.set(id, event);
    return event;
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async updateEvent(id: string, updateData: Partial<InsertEvent>): Promise<Event> {
    const existingEvent = this.events.get(id);
    if (!existingEvent) {
      throw new Error("Event not found");
    }
    
    const updatedEvent: Event = {
      ...existingEvent,
      ...updateData,
      updatedAt: new Date()
    };
    
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: string): Promise<boolean> {
    return this.events.delete(id);
  }
}

class DbStorage implements IStorage {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await this.db.insert(contactSubmissions).values(insertSubmission).returning();
    return result[0];
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await this.db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const result = await this.db.insert(events).values(insertEvent).returning();
    return result[0];
  }

  async getEvents(): Promise<Event[]> {
    return await this.db.select().from(events).orderBy(events.createdAt);
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const result = await this.db.select().from(events).where(eq(events.id, id)).limit(1);
    return result[0];
  }

  async updateEvent(id: string, updateData: Partial<InsertEvent>): Promise<Event> {
    const result = await this.db.update(events).set(updateData).where(eq(events.id, id)).returning();
    if (!result[0]) {
      throw new Error("Event not found");
    }
    return result[0];
  }

  async deleteEvent(id: string): Promise<boolean> {
    const result = await this.db.delete(events).where(eq(events.id, id)).returning();
    return result.length > 0;
  }
}

// Initialize storage based on available configuration
let storageInstance: IStorage;

if (process.env.DATABASE_URL) {
  try {
    const connection = neon(process.env.DATABASE_URL);
    const db = drizzle(connection);
    storageInstance = new DbStorage(db);
    console.log('Using database storage');
  } catch (error) {
    console.warn('Failed to initialize database storage:', error);
    storageInstance = new MemStorage();
    console.log('Falling back to memory storage');
  }
} else {
  storageInstance = new MemStorage();
  console.log('Using memory storage (no DATABASE_URL provided)');
}

export const storage = storageInstance;
