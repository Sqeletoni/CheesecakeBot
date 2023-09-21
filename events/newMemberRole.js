//gives new members the starter role
const roleId = "1134141016794996736";

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
      console.log(`New member joined: ${member.user.tag}`);

      // Getting the role by its ID
      const role = member.guild.roles.cache.get(roleId);

      // Check if the role exists and if the bot has the required permissions to assign the role
      if (role) {
        member.roles
          .add(role)
          .then(() => console.log(`Added role to ${member.user.tag}`))
          .catch((error) =>
            console.error(`Error adding role to ${member.user.tag}: ${error}`)
          );
      } else {
        console.error(
          `Role with ID ${roleId} not found! Make sure the role ID is correct.`
        );
      }
    },
};
