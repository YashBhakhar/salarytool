import { Request, Response } from "express";

import { EmployeeService } from "./employee.service";

const service = new EmployeeService();

export class EmployeeController {
  create(req: Request, res: Response) {
    try {
      const result = service.create(req.body);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error,
      });
    }
  }

  getAll(req: Request, res: Response) {
    const result = service.getAll({
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      search: req.query.search as string,
      country: req.query.country as string,
    });

    res.json({
      success: true,
      data: result,
    });
  }

  getById(req: Request, res: Response) {
    const result = service.getById(Number(req.params.id));

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    res.json({
      success: true,
      data: result,
    });
  }

  update(req: Request, res: Response) {
    try {
      const result = service.update(Number(req.params.id), req.body);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error,
      });
    }
  }

  delete(req: Request, res: Response) {
    const result = service.delete(Number(req.params.id));

    res.json({
      success: true,
      data: result,
    });
  }
}
