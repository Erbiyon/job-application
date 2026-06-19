"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. CREATE: เพิ่มบันทึกการสมัครงานใหม่
export async function createApplication(formData: FormData) {
    const companyName = formData.get("companyName") as string;
    const position = formData.get("position") as string;
    const salaryExpectation = formData.get("salaryExpectation") ? Number(formData.get("salaryExpectation")) : null;
    const jobUrl = formData.get("jobUrl") as string || null;

    await prisma.jobApplication.create({
        data: {
            companyName,
            position,
            status: "SAVED", // เริ่มต้นที่สถานะบันทึกไว้ก่อนยื่นจริง
            salaryExpectation,
            jobUrl,
        },
    });

    // สั่งให้ Next.js รีเฟรชข้อมูลในหน้าแรกทันทีโดยไม่ต้องรีโหลดเว็บ
    revalidatePath("/");
}

// 2. READ: ดึงข้อมูลทั้งหมด
export async function getApplications() {
    return await prisma.jobApplication.findMany({
        orderBy: { createdAt: "desc" },
    });
}

// 3. UPDATE (STATUS): อัปเดตสถานะ (ลากย้ายจาก APPLIED ไป INTERVIEWING)
export async function updateApplicationStatus(id: string, newStatus: string) {
    await prisma.jobApplication.update({
        where: { id },
        data: { status: newStatus },
    });
    revalidatePath("/");
}

// 4. UPDATE (DETAILS): แก้ไขข้อมูลรายละเอียดทั้งหมดผ่าน Modal
export async function updateApplicationDetails(id: string, formData: FormData) {
    const companyName = formData.get("companyName") as string;
    const position = formData.get("position") as string;

    await prisma.jobApplication.update({
        where: { id },
        data: {
            companyName,
            position,
        },
    });
    revalidatePath("/");
}

// 5. DELETE: ลบรายการที่ไม่ต้องการแล้ว
export async function deleteApplication(id: string) {
    await prisma.jobApplication.delete({
        where: { id },
    });
    revalidatePath("/");
}