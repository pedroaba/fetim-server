import { Student } from "@applications/entities/Student";
import {
  StudentList,
  StudentListParams,
  StudentRepository,
} from "@applications/repositories/student-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaStudentMapper } from "../mappers/prisma-student-mapper";

@Injectable()
export class PrismaStudentRepository implements StudentRepository {
  constructor(private prisma: PrismaService) {}

  async listAll({ page, per_page }: StudentListParams): Promise<StudentList> {
    const skipRows = per_page * page - per_page;
    const students = await this.prisma.student.findMany({
      orderBy: {
        registration: "asc",
      },
      skip: skipRows,
      take: per_page,
    });

    const totalOfStudent = await this.prisma.student.count();

    return {
      per_page,
      count: totalOfStudent,
      page,
      students: students.map(PrismaStudentMapper.toDomain),
    };
  }

  async create(student: Student): Promise<Student> {
    const raw = PrismaStudentMapper.toPrisma(student);

    const studentInPrisma = await this.prisma.student.create({
      data: raw,
    });

    return PrismaStudentMapper.toDomain(studentInPrisma);
  }
}