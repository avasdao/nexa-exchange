<script setup lang="ts">
useHead({
    title: 'Legal — Nexa Exchange',
    meta: [
        { name: 'description', content: 'Nexa Exchange.' }
    ],
})

/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <main class="max-w-7xl mx-auto py-5">
        <h1 class="text-5xl font-medium">
            Legal
        </h1>

        <p>
            Last updated: June 19th, 2023
        </p>

        <section class="flex flex-col gap-5">
            <h3>
                Introduction
            </h3>

            <p>
                Nexa Exchange Anti-Money Laundering and Know Your Customer Policy (hereinafter - the “AML/KYC Policy”) is designated to prevent and mitigate possible risks of Nexa Exchange being involved in any kind of illegal activity.
            </p>

            <p>
                Both international and local regulations require Nexa Exchange to implement effective internal procedures and mechanisms to prevent money laundering, terrorist financing, drug and human trafficking, proliferation of weapons of mass destruction, corruption and bribery and to take action in case of any form of suspicious activity from its Users.
            </p>
        </section>

        <section class="flex flex-col gap-5">
            <h3>
                For Law Enforcement requests please direct your official document to our compliance team <NuxtLink to="https://app.kodex.us/telr/signin" target="_blank">here</NuxtLink>.
            </h3>

            <p>
                AML/KYC Policy covers the following matters:
            </p>

            <div>
                <ol>
                    <li>Verification procedures</li>
                    <li>Compliance Officer</li>
                    <li>Monitoring transactions</li>
                    <li>Risk assessment</li>
                </ol>
            </div>
        </section>

        <section class="flex flex-col gap-5">
            <h3>
                1. Verification procedures
            </h3>

            <p>
                One of the international standards for preventing illegal activity is customer due diligence (“CDD”). According to CDD, Nexa Exchange establishes its own verification procedures within the standards of anti-money laundering and “Know Your Customer” frameworks, including enhanced due diligence for customers presenting a higher risk, such as Politically Exposed Persons (PEPs).
            </p>

            <p>
                Nexa Exchange's identity verification procedure requires the User to provide Nexa Exchange with reliable, independent source documents, data or information (e.g., national ID, international passport, bank statement, utility bill). For such purposes Nexa Exchange reserves the right to collect User's identification information for the AML/KYC Policy purposes.
            </p>

            <p>
                Nexa Exchange will take steps to confirm the authenticity of documents and information provided by the Users. All legal methods for double-checking identification information will be used and Nexa Exchange reserves the right to investigate certain Users who have been determined to be risky or suspicious.
            </p>

            <p>
                Nexa Exchange reserves the right to verify User's identity in an on-going basis, especially when their identification information has been changed or their activity seemed to be suspicious (unusual for the particular User). In addition, Nexa Exchange reserves the right to request up-to-date documents from the Users, even though they have passed identity verification in the past.
            </p>

            <p>
                User's identification information will be collected, stored, shared and protected strictly in accordance with the Nexa Exchange's Privacy Policy and related regulations.
            </p>

            <p>
                Once the User's identity has been verified, Nexa Exchange is able to remove itself from potential legal liability in a situation where its Services are used to conduct illegal activity.
            </p>

            <p>
                Nexa Exchange is prohibited from transacting with individuals, companies and countries that are on prescribed sanctions lists. Nexa Exchange will therefore screen against United Nations, European Union, UK Treasury and US Office of Foreign Assets Control (OFAC) sanctions lists in all jurisdictions in which we operate.
            </p>
        </section>

        <section class="flex flex-col gap-5">
            <h3>
                2. Compliance Officer
            </h3>

            <p>
                The Compliance Officer is the person, duly authorized by Nexa Exchange, whose duty is to ensure the effective implementation and enforcement of the AML/KYC Policy. It is the Compliance Officer's responsibility to supervise all aspects of Nexa Exchange's anti-money laundering and counter-terrorist financing, including but not limited to:
            </p>

            <p>
                Collecting Users' identification information;

Establishing and updating internal policies and procedures for the completion, review, submission and retention of all reports and records required under the applicable laws and regulations;

Monitoring transactions and investigating any significant deviations from normal activity;

Implementing a records management system for appropriate storage and retrieval of documents, files, forms and logs;

Updating risk assessment regularly;

Providing law enforcement with information as required under the applicable laws and regulations.
            </p>

            <p>
                The Compliance Officer is entitled to interact with law enforcement, which are involved in prevention of money laundering, terrorist financing and other illegal activity.
            </p>
        </section>

        <section class="flex flex-col gap-5">
            <h3>
                3. Monitoring transactions
            </h3>

            <p>
                The Users are known not only by verifying their identity (who they are) but, more importantly, by analyzing their transactional patterns (what they do). Therefore, Nexa Exchange relies on data analysis as a risk-assessment and suspicion detection tool. Nexa Exchange performs a variety of compliance-related tasks, including capturing data, filtering, record-keeping, investigation management, and reporting. System functionalities include:
            </p>

            <p>
                Daily check of Users against recognized “black lists” (e.g. OFAC), aggregating transfers by multiple data points, placing Users on watch and service denial lists, opening cases for investigation where needed, sending internal communications and filling out statutory reports, if applicable;

Case and document management.
            </p>

            <p>
                With regard to the AML/KYC Policy, Nexa Exchange will monitor all transactions and it reserves the right to:
            </p>

            <p>
                Ensure that transactions of suspicious nature are reported to the proper law enforcement through the Compliance Officer;

Request the User to provide any additional information and documents in case of suspicious transactions;

suspend or terminate User's Account when Nexa Exchange has reasonably suspicion that such User engaged in illegal activity.
            </p>

            <p>
                The above list is not exhaustive and the Compliance Officer will monitor Users' transactions on a day-to-day basis in order to define whether such transactions are to be reported and treated as suspicious or are to be treated as bona fide.
            </p>
        </section>

        <section class="flex flex-col gap-5">
            <h3>
                4. Risk assessment
            </h3>

            <p>
                Nexa Exchange, in line with the international requirements, has adopted a risk-based approach to combating money laundering and terrorist financing. By adopting a risk-based approach, Nexa Exchange is able to ensure that measures to prevent or mitigate money laundering and terrorist financing are commensurate to the identified risks. This will allow resources to be allocated in the most efficient ways. The principle is that resources should be directed in accordance with priorities so that the greatest risks receive the highest attention.
            </p>
        </section>

    </main>

    <AppFooter />
</template>
