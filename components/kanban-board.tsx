"use client";

import { useState, useEffect } from "react";
import { updateApplicationStatus, deleteApplication, updateApplicationDetails } from "@/app/actions/jobActions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Pencil } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export interface JobApp {
    id: string;
    companyName: string;
    position: string;
    status: string;
}

const COLUMNS = [
    { id: "SAVED", title: "📑 บันทึกไว้", variant: "outline" as const },
    { id: "APPLIED", title: "🚀 ยื่นแล้ว", variant: "primary" as const },
    { id: "INTERVIEWING", title: "🗣️ นัดสัมภาษณ์", variant: "almost" as const },
    { id: "OFFER", title: "🎉 ได้งานแล้ว", variant: "success" as const },
    { id: "REJECTED", title: "❌ ปฏิเสธ", variant: "destructive" as const },
];

export default function KanbanBoard({ initialData }: { initialData: JobApp[] }) {
    const [cards, setCards] = useState<JobApp[]>(initialData);
    const [isMounted, setIsMounted] = useState(false);

    // State สำหรับเก็บข้อมูลการ์ดที่กำลังกดแก้ไข
    const [editingCard, setEditingCard] = useState<JobApp | null>(null);

    useEffect(() => {
        setIsMounted(true);
        // อัปเดต State ถ้า Database มีการเปลี่ยนแปลงจาก Server
        setCards(initialData);
    }, [initialData]);

    const onDragEnd = async (result: DropResult) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const targetStatus = destination.droppableId;

        setCards((prev) =>
            prev.map((card) =>
                card.id === draggableId ? { ...card, status: targetStatus } : card
            )
        );
        await updateApplicationStatus(draggableId, targetStatus);
    };

    // ลอจิกการลบข้อมูล
    const handleDelete = async (id: string) => {
        // 1. ลบออกจากหน้าจอทันที (Optimistic Update)
        setCards((prev) => prev.filter((card) => card.id !== id));
        // 2. เรียก Server Action ไปลบใน Database
        await deleteApplication(id);
    };

    // ลอจิกการส่งฟอร์มแก้ไขข้อมูล
    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!editingCard) return;

        const formData = new FormData(e.currentTarget);
        const newCompanyName = formData.get("companyName") as string;
        const newPosition = formData.get("position") as string;

        // 1. อัปเดตหน้าจอทันที
        setCards((prev) =>
            prev.map((card) =>
                card.id === editingCard.id
                    ? { ...card, companyName: newCompanyName, position: newPosition }
                    : card
            )
        );

        // ปิด Modal
        setEditingCard(null);

        // 2. เรียก Server Action
        await updateApplicationDetails(editingCard.id, formData);
    };

    if (!isMounted) return null;

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-4 overflow-x-auto pb-4 items-start select-none">
                    {COLUMNS.map((col) => {
                        const columnCards = cards.filter((card) => card.status === col.id);

                        return (
                            <Droppable key={col.id} droppableId={col.id}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`shrink-0 w-80 bg-muted/40 rounded-xl p-3 min-h-125 flex flex-col gap-3 border transition-colors ${snapshot.isDraggingOver ? "border-primary/50 bg-muted/60" : "border-border"
                                            }`}
                                    >
                                        <div className="flex justify-between items-center px-2 py-1">
                                            <span className="font-semibold text-sm text-foreground/80">{col.title}</span>
                                            <Badge variant={col.variant} className="rounded-full px-2 py-0.5 text-xs font-semibold">
                                                {columnCards.length}
                                            </Badge>
                                        </div>

                                        <div className="flex flex-col gap-2 grow">
                                            {columnCards.map((card, index) => (
                                                <Draggable key={card.id} draggableId={card.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{ ...provided.draggableProps.style, opacity: snapshot.isDragging ? 0.8 : 1 }}
                                                            className="group relative" // เพิ่ม group เพื่อทำ Hover effect ของปุ่ม
                                                        >
                                                            <Card className={`bg-card transition-shadow ${snapshot.isDragging ? "shadow-lg ring-1 ring-primary/50" : "shadow-sm hover:border-accent-foreground/30"
                                                                }`}>
                                                                <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                                                                    <CardTitle className="text-sm font-bold leading-tight text-card-foreground">
                                                                        {card.position}
                                                                    </CardTitle>

                                                                    {/* ปุ่มแก้ไขและลบ (จะโชว์ขึ้นมาตอนเอาเมาส์ชี้การ์ด) */}
                                                                    <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            className="h-6 w-6 text-muted-foreground hover:text-blue-500"
                                                                            onClick={() => setEditingCard(card)} // เปิด Modal แก้ไข
                                                                        >
                                                                            <Pencil className="h-3 w-3" />
                                                                        </Button>
                                                                        <AlertDialog>
                                                                            <AlertDialogTrigger asChild>
                                                                                <Button variant="ghost"
                                                                                    size="icon"
                                                                                    className="h-6 w-6 text-muted-foreground hover:text-red-500"
                                                                                >
                                                                                   <Trash2 className="h-3 w-3" />
                                                                                </Button>
                                                                            </AlertDialogTrigger>
                                                                            <AlertDialogContent>
                                                                                <AlertDialogHeader>
                                                                                    <AlertDialogTitle>คุณแน่ใจหรือไม่?</AlertDialogTitle>
                                                                                    <AlertDialogDescription>
                                                                                        การลบใบสมัครนี้จะไม่สามารถกู้คืนได้
                                                                                    </AlertDialogDescription>
                                                                                </AlertDialogHeader>
                                                                                <AlertDialogFooter>
                                                                                    <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                                                                                    <AlertDialogAction
                                                                                        onClick={() => handleDelete(card.id)} // สั่งลบ
                                                                                    >
                                                                                        ลบ
                                                                                    </AlertDialogAction>
                                                                                </AlertDialogFooter>
                                                                            </AlertDialogContent>
                                                                        </AlertDialog>
                                                                    </div>

                                                                </CardHeader>
                                                                <CardContent className="p-4 pt-0 text-xs text-muted-foreground">
                                                                    {card.companyName}
                                                                </CardContent>
                                                            </Card>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        );
                    })}
                </div>
            </DragDropContext>

            {/* Modal สำหรับแก้ไขข้อมูล */}
            <Dialog open={!!editingCard} onOpenChange={(open) => !open && setEditingCard(null)}>
                <DialogContent className="sm:max-w-106.25">
                    <DialogHeader>
                        <DialogTitle>แก้ไขข้อมูล</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit} className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-company">ชื่อบริษัท</Label>
                            <Input
                                id="edit-company"
                                name="companyName"
                                defaultValue={editingCard?.companyName}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="edit-position">ตำแหน่ง</Label>
                            <Input
                                id="edit-position"
                                name="position"
                                defaultValue={editingCard?.position}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full mt-2">บันทึกการแก้ไข</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}