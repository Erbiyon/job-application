import { ModeToggle } from '@/components/mode-toggle';
import Image from 'next/image';
import { getApplications, createApplication } from './actions/jobActions';
import KanbanBoard from '@/components/kanban-board';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default async function Home() {
  // ดึงข้อมูลจากฐานข้อมูลตรงๆ (ดึงจาก PostgreSQL)
  const applications = await getApplications();

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-200">
      
      {/* 🟢 ส่วน Navbar ด้านบน (โค้ดของคุณ) */}
      <nav className="flex items-center gap-2 p-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Image
            src="https://thesvg.org/icons/spotify/default.svg"
            alt="Logo"
            width={30}
            height={30}
            className="dark:invert-0" // ถ้าโลโก้กลืนกับสีพื้นหลัง ค่อยเอา invert ออกหรือใส่เพิ่มได้ครับ
          />
          <div className="text-2xl font-extrabold tracking-tight">MyJob Application</div>
        </div>
        <div className="ml-auto">
          <ModeToggle />
        </div>
      </nav>

      {/* 🟢 ส่วนพื้นที่หลักของ Dashboard */}
      <div className="flex-1 p-6 md:p-8 max-w-[1600px] mx-auto w-full">
        
        {/* Header ย่อยสำหรับจัดการข้อมูล */}
        <header className="mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">กระดานติดตามสถานะ</h1>
            <p className="text-sm text-muted-foreground mt-1">ลากและวางเพื่ออัปเดตสถานะการสมัครงานของคุณ</p>
          </div>

          {/* Modal เพิ่มใบสมัคร */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="font-semibold">
                + เพิ่มใบสมัครใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>เพิ่มบันทึกการสมัครงาน</DialogTitle>
                <DialogDescription>
                  กรอกข้อมูลบริษัทที่ต้องการแทร็กสถานะ ระบบจะบันทึกลงฐานข้อมูลทันที
                </DialogDescription>
              </DialogHeader>
              
              <form action={createApplication} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="companyName">ชื่อบริษัท *</Label>
                  <Input id="companyName" name="companyName" placeholder="เช่น Google, Line" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="position">ตำแหน่ง *</Label>
                  <Input id="position" name="position" placeholder="เช่น Full-stack Developer" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="salaryExpectation">เงินเดือนที่คาดหวัง</Label>
                  <Input id="salaryExpectation" name="salaryExpectation" type="number" placeholder="เช่น 35000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="jobUrl">ลิงก์ประกาศงาน</Label>
                  <Input id="jobUrl" name="jobUrl" type="url" placeholder="https://..." />
                </div>
                <Button type="submit">บันทึกข้อมูล</Button>
              </form>
            </DialogContent>
          </Dialog>
        </header>

        {/* โยนข้อมูลเข้า Kanban Board */}
        <KanbanBoard initialData={applications} />
        
      </div>
    </main>
  );
}