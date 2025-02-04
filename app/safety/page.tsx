'use client';

import Image from 'next/image';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { MdOutlineSafetyDivider } from 'react-icons/md';
import { GiWaterDrop, GiFireplace } from 'react-icons/gi';
import { TbRulerMeasure } from 'react-icons/tb';
import { BsBoxSeam } from 'react-icons/bs';
import { IoWarningOutline } from 'react-icons/io5';
import { RiTShirtLine } from 'react-icons/ri';

const dos = [
    {
        id: 1,
        title: 'Instructions',
        description: 'Display fireworks as per the instructions mentioned on the label',
        icon: BsBoxSeam
    },
    {
        id: 2,
        title: 'Distance',
        description: 'Light it only at a safe distance at a time, by one person. Others should watch from a safe distance',
        icon: TbRulerMeasure
    },
    {
        id: 3,
        title: 'Branded Fireworks',
        description: 'Buy fireworks from authorized / reputed manufacturers only',
        icon: MdOutlineSafetyDivider
    },
    {
        id: 4,
        title: 'Water',
        description: 'Keep two buckets of water handy in the event of fire or any mishap',
        icon: GiWaterDrop
    },
    {
        id: 5,
        title: 'Outdoor',
        description: 'Use fireworks only outdoor',
        icon: GiFireplace
    }
];

const donts = [
    {
        id: 1,
        title: "Don't make tricks",
        description: 'Never point or throw fireworks at another person',
        icon: IoWarningOutline
    },
    {
        id: 2,
        title: "Don't Touch It",
        description: 'After lighting the flower stick or fireworks, dont touch them even after they cool off (may be alive)',
        icon: IoWarningOutline
    },
    {
        id: 3,
        title: "Don't relight",
        description: 'Never try to re-light or pick up fireworks that have not ignited fully',
        icon: IoWarningOutline
    },
    {
        id: 4,
        title: "Don't carry it",
        description: 'Never carry fireworks in your pockets',
        icon: IoWarningOutline
    },
    {
        id: 5,
        title: "Don't wear loose clothes",
        description: 'Do not wear loose clothing while bursting fireworks',
        icon: RiTShirtLine
    }
];

export default function Safety() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-b from-red-800 to-red-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Safety Tips
                    </h1>
                    <p className="text-xl text-red-100 max-w-2xl mx-auto">
                        There are certain Do&apos;s & Don&apos;ts to follow while using fireworks, bursting and storing crackers. Thus, it is very important to follow the manufacturer&apos;s safety bursting guidelines. A few main factors, their purpose and considerations can create a blast blast.
                    </p>
                </div>
            </section>

            {/* Do's Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-red-800 mb-12">Do&apos;s</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dos.map((item) => (
                            <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg border border-green-100 hover:border-green-300 transition-colors">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                            <FaCheck className="w-6 h-6 text-green-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Don'ts Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-red-800 mb-12">Don&apos;ts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {donts.map((item) => (
                            <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg border border-red-100 hover:border-red-300 transition-colors">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                            <FaTimes className="w-6 h-6 text-red-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
