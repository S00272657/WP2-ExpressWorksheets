import { Schema, model } from 'mongoose';
import { z } from 'zod';

export interface ICar {
  make: string;
  model: string;
  year: number;
}

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateCarInput:
 *       type: object
 *       required:
 *         - make
 *         - model
 *       properties:
 *         make:
 *           type: string
 *           example: Renault
 *         model:
 *           type: string
 *           example: Megane
 *         year:
 *           type: integer
 *           example: 2010
 */

export const createCarZSchema = z.object({
  body:z.object({
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.number().min(1950).optional(),
  }),
});

export const updateCarZSchema = z.object({
  body: z.object({
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.number().min(1950).optional(),
  }),
});


const carSchema = new Schema<ICar>(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, min: 1950 },
  },
  { timestamps: true }
);

//for validating the request params
export const carParamsSchema = z.object({
  params: z.object({
    id: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId')
  })
});


export const CarModel = model<ICar>('Car', carSchema);
