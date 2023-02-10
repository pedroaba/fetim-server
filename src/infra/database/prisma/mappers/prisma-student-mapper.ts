import { Student as PrismaStudent } from "@prisma/client";
import { Student } from "@applications/entities/Student";

export class PrismaStudentMapper {
  static toPrisma(student: Student) {
    return {
      firebase_id: student.uid ?? "",
      email: student.email,
      photo_url: student.avatarUrl ?? "",
      tenant_id: student.tenantId ?? "",
      username: student.username ?? "",
    };
  }

  static toDomain(student: PrismaStudent) {
    const { email, firebase_id, tenant_id, photo_url, username } = student;

    return new Student({
      email,
      displayName: username,
      photoUrl: photo_url,
      tenantId: tenant_id,
      uid: firebase_id,
    });
  }
}
