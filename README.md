## Startpage Usage
#  Links
This startpage will read all of the links displayed on the screen from the file "web.xml". "web.xml" should be formatted as follows: 
```xml
<web> 
  <directory category="name"> <!--Directories group links together. For example, a news directory could have links to BBC and CNN-->
    <site>
      <name>Example</name> <!--The name of the site, which is what is displayed-->
      <url>https://example.com</url> <!--Where clicking on the link will lead-->
    </site>
  </directory>
</web>
```
#  Usage
This startpage uses vim-like keybindings. 
- The 'H' and 'L' keys will switch between directories, and the 'J' and 'K' keys will move the "cursor" up and down. 
- Pressing 'Enter' or ';' will redirect the page to the currently selected link. 
- Pressing 'I' will put the focus on the Search Bar, and 'Esc' will allow you to navigate the links again. For qutebrowser you may want to use the 'fake-key' command for this.
- Pressing 'O' will combine the currently selected link with the contents of the Search Bar. For example, if the "cursor" is on https://example.com, and the Search Bar contains the word "example", pressing O will redirect the user to https://example.com/example
- The Search Bar by default will redirect you to a Searx instance, but it can be used to search other sites. Putting "-goo" in front of your request will search Google, "-yt " will search Youtube (the space is required), and "-nav" will redirect you to whatever is in the Search Bar instead of searching for it.
