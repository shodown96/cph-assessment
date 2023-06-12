# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.


# Your Breakdown Here

## Summary
The overall concept of the flow involves having a list of Available Agents that can be hired by a facility. Once the facility has identified the appropriate Agents for each shift, they can assign a unique custom ID to each Agent during the hiring process. It is possible that the same ID may be used by another company, but this should not cause any issues as long as the IDs remain unique within each facility. In other words, no two Agents hired by the same facility should have the same ID. The assigned custom ID should be editable by the facility, allowing them to assign specific roles to different IDs and remove IDs when the contracts with the Agents are terminated.

When generating reports, the custom ID field becomes relevant. The `getShiftsByFacility` function can retrieve all the shifts worked in a given quarter, along with the metadata about the assigned Agent for each shift. At this point, the custom ID can be included in the metadata of each assigned Agent.

Finally, when generating the PDF, the custom ID can be presented as "Agent's Facility ID" or any other suitable label that makes it clear and meaningful to the facility.


This Ticket can be broken down to the following:

## The data definition for the Custom Agent IDs
**Acceptance criteria:**
As a frontend developer, I should be recieve an extra `id_by_facility` that comes with every agent related API endpoint the application interacts with. This task is to be assigned to a backend engineer.

**Implementation:**   
- Considering that each Agent already has an internal database ID assigned to them, it is recommended to include an extra field called `id_by_facility` in the `Agent` model. The data type of this field should be a string, this will allow the facility to decide whether they want to use a numerical field, alphanumerical or a random string combination. This additional field will provide facilities with the capability to assign custom IDs to each Agent working for them.

- During the serialization process of the Agents, it is important to include the serialization of the `id_by_facility` field. Initially, the values of this field should be left as empty or null. These values will be populated once a facility hires the respective Agent. When listing Agents in any endpoint, the `id_by_facility` fields should either display null or the actual assigned IDs.

- When hiring an Agent, the corresponding endpoint should anticipate the presence of `id_by_facility` so that it can be associated with the Agent during the hiring process. In the event that a facility decides to terminate the contract with a specific Agent, they can simply remove the ID associated with that Agent.


## How is each Custom Agent ID is generated
**Acceptance Criteria:** 
A facility should be able to view and change the custom IDs assigned to each Agent. This task is to be assigned to a frontend engineer.

**Implelentation:**
- Assuming a UI already exists which shows a list of acceptable agents to be hired by the facility.
  
- When an Agent is to be hired, a modal or any other suitable view should be used to present a form that allows the facility to input the custom ID to be used by the Agent throughout the working period of the Agent.
  
- A UI should be developed to view the current Agent data, the view should also have a form with editable fields especially the `id_by_facility` field which can then be used to edit the Custom ID assigned by the facility.
  
- A function should be developed to go through the current agents hired by the facility to be sure that no other Agent possesses the same ID.
This function should run everytime the facility (whoever handles the Agent's information in the hiring facility) stops typing when inputting a value for the custom ID (`id_by_facility`).

**Note:** 
The facility should have the ability to edit only the information relevant to them, specifically related to the facility. Additionally, the facility should be granted access to view only the necessary information.


## How the Custom Agent IDs should be rendered in the reports
**Acceptance requirements:**
When reports are being generated by the system. The facility should be able to see Agent's assigned custom ID. This task is both Frontend and backend dependent.

**Implementation**
- In the `getShiftsByFacility` function, where shifts per quarter are being returned along with each indiviual shift's assigned Agent metadata, ensure the the `id_by_facility` is also included.
  
- Develop a UI which can be used by the `generateReport` function. This UI will serve as a template for the generated PDF, allowing the data required for the reports to be presented in a consistent and visually appealing manner.
  
- To enhance clarity for the facility, the `id_by_facility` should be displayed as "Agent's Facility ID" when rendering the report, making it easier for the facility to understand.
  
- To guarantee that the generated PDF maintains the visual design of the created UI, it is crucial to choose an appropriate package that enables manipulation of the data visualization aesthetics. This might entail conducting research to identify the most suitable package for this specific requirement.