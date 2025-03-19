import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Components/Hooks/useAuth";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import SectionTitle from "../../../../Components/Common/SectionTitle";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    return (
        <div className="bg-gray-100 min-h-screen p-10 flex flex-col items-center">


            <SectionTitle subHeading="---At a Glance!---" heading="PAYMENT HISTORY">

            </SectionTitle>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full">
                <h2 className="text-xl font-semibold mb-4">Total Payments: {payments.length}</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-yellow-600 text-white">
                                <th className="p-3 text-left">EMAIL</th>
                                <th className="p-3 text-left">CATEGORY</th>
                                <th className="p-3 text-left">TOTAL PRICE</th>
                                <th className="p-3 text-left">PAYMENT DATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="border-b">
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">Food Order</td>
                                    <td className="p-3">${payment.price}</td>
                                    <td className="p-3">{new Date(payment.date).toDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;
