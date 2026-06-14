import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { db } from "@/db";
import { formatPrice } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return notFound();
  }

  const orders = await db.order.findMany({
    where: {
      userId: user.id,
      isPaid: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      configuration: true,
      ShippingAddress: true,
    },
  });

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <div className="max-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
        <div className="flex flex-col gap-8 px-4 sm:px-6 lg:px-8 mt-8">
          <h1 className="text-4xl font-bold tracking-tight">My Orders</h1>

          {orders.length === 0 ? (
            <Card className="flex flex-col items-center justify-center py-16 px-4 text-center">
              <CardHeader>
                <CardTitle className="text-2xl">No orders found</CardTitle>
                <CardDescription className="text-base mt-2">
                  You haven't placed any orders yet. Start customizing your own case today!
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-4">
                <Link
                  href="/configure/upload"
                  className={buttonVariants({
                    size: "lg",
                  })}
                >
                  Create your first case
                </Link>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="sm:table-cell">Purchase date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="bg-accent">
                      <TableCell>
                        <div className="font-medium text-sm sm:text-base">
                          {order.id.slice(-8).toUpperCase()}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize bg-primary/10 text-primary">
                          {order.status.replace("_", " ")}
                        </span>
                      </TableCell>
                      <TableCell className="md:table-cell">
                        {order.createdAt.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatPrice(order.amount)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
