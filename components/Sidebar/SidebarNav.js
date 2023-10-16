import Link from "next/link";

export default function SidebarNav() {
    return (
        <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
        </ul>
    )
}