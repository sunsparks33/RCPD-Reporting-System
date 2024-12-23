document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("crime-report-form");
    const reportsContainer = document.getElementById("reports-container");
    const webhookUrl = "https://discord.com/api/webhooks/1320404843537633330/qqMvTiR3xKlkrzOqQLfz9g3CvRMmQsexBhIPhSM04yMC-cct0hPXSP_0aqMTdK9UXN9V";

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Get form data
        const reporterName = document.getElementById("reporter-name").value;
        const ranks = document.getElementById("ranks").value;
        const phone = document.getElementById("Num-Phone").value;
        const victimName = document.getElementById("name-of-victim").value || "Not Provided";
        const victimDesc = document.getElementById("Victim Description").value || "Not Provided";
        const suspectName = document.getElementById("suspect-name").value;
        const crime = document.getElementById("crime").value;
        const crimeDescription = document.getElementById("crime-description").value;
        const punishment = document.getElementById("Punishement").value;
        const crimeTime = document.getElementById("crime-time").value;

        // Add a new report to the container
        const reportDiv = document.createElement("div");
        reportDiv.classList.add("report");
        reportDiv.innerHTML = `
            <h3>Reported by: ${reporterName}</h3>
            <p><strong>Rank(s):</strong> ${ranks}</p>
            <p><strong>Phone Number:</strong> ${phone}</p>
            <p><strong>Suspect:</strong> ${suspectName}</p>
            <p><strong>Crime:</strong> ${crime}</p>
            <p><strong>Description:</strong> ${crimeDescription}</p>
            <p><strong>Victim:</strong> ${victimName}</p>
            <p><strong>Victim Description:</strong> ${victimDesc}</p>
            <p><strong>Punishment:</strong> ${punishment}</p>
            <p><strong>Date & Time:</strong> ${new Date(crimeTime).toLocaleString()}</p>
        `;
        reportsContainer.appendChild(reportDiv);

        // Prepare webhook payload
        const embedPayload = {
            content: "<@790715362219917342> & <@1206286468549574708> New Crime Report Submitted 🚨",
            embeds: [
                {
                    title: "**Crime Report Information** 🚔",
                    description: `
                        **Name**: \`\`\`${reporterName}\`\`\`
                        **Rank(s)**: \`\`\`${ranks}\`\`\`
                        **Name of Victim**: \`\`\`${victimName}\`\`\`
                        **Phone Number**: \`\`\`${phone}\`\`\`
                        **Victim Description**: \`\`\`${victimDesc}\`\`\`
                        **Suspect Name**: \`\`\`${suspectName}\`\`\`
                        **Crime**: \`\`\`${crime}\`\`\`
                        **Crime Description**: \`\`\`${crimeDescription}\`\`\`
                        **Punishment**: \`\`\`${punishment}\`\`\`
                        **Date & Time**: \`\`\`${new Date(crimeTime).toLocaleString()}\`\`\`
                    `,
                    color: 16711680 , // Red color for the report
                    image: {
                        url: "https://cdn.discordapp.com/banners/1084146853702008872/124c297212c31a4044b846605e90fd9a.webp?size=4096"
                    },
                    footer: {
                        text: "RCPD Crime Reporting System",
                        icon_url: "https://cdn.discordapp.com/attachments/1208340604212482048/1320510123319496734/redlogo.png?ex=6769dc63&is=67688ae3&hm=5a9d35419c59c7f8b883bf728a0d84b37f65c522fb7e4f18f711a7990f109d27&", // Replace with your icon
                    },
                    timestamp: new Date().toISOString(),
                }
            ],
        };

        // Send the embed to Discord
        try {
            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(embedPayload),
            });

            if (response.ok) {
                alert("Report successfully submitted & sent to Discord 🎉");
            } else {
                alert("Failed to send the report to Discord. ❌");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while sending the report. ⚠️");
        }

        // Reset form
        form.reset();
    });
});
