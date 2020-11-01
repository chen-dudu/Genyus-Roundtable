
<p align="center">
    <img src="genyus-Roundtable-readme.png" alt="genyus roundtable logo">
</p>
<br>

# Genyus Roundtable

Genyus Roundtable is a part of the offerings of the Genyus Network. Roundtable is an online peer-led focus group where people with shared commonalities and traits can discuss research which directly involves their broader peer groups in a fun and empowering way.

## Contributors

<table>
    <tr>
        <td align="center">
            <a href="https://bitbucket.cis.unimelb.edu.au:8445/plugins/servlet/user-contributions/haichaos?view=summary">Haichao Song</a>
            <br>
            <p align="center">:computer:</p>
        </td>
        <td align="center">
            <a href="https://bitbucket.cis.unimelb.edu.au:8445/plugins/servlet/user-contributions/kaixuang?view=summary">Kaixuan Guo</a>
            <br>
            <p align="center">:computer:</p>
        </td>
        <td align="center">
            <a href="https://bitbucket.cis.unimelb.edu.au:8445/plugins/servlet/user-contributions/liguoc?view=summary">Liguo Chen</a>
            <br>
            <p align="center">:computer:</p>
        </td>
        <td align="center">
            <a href="https://bitbucket.cis.unimelb.edu.au:8445/plugins/servlet/user-contributions/yujuny?view=summary">Yujun Yan</a>
            <br>
            <p align="center">:computer:</p>
        </td>
    </tr>
</table>

## Supervisor

<table>
    <tr>
        <td align="center">
            <a href="https://bitbucket.cis.unimelb.edu.au:8445/projects/SWEN900142020WSECHIDNA/repos/swen90014-2020-ws-echidna/browse">Peter Eze</a>
            <br>
            <p align="center">:computer:</p>
        </td>
    </tr>
</table>

## Project Structure
```
root
 |
 |-- functions
 |      - where firebase cloud functions codes live
 |-- public
 |      - where index.html lives
 |-- src
 |      - all the source codes are here
 |-- package.json
 |      - contains information about the project, e.g. project metadata and project dependencies
 |-- firebase.json
 |      - contains parameters for firebase cloud function and firebase hosting
```

## Execution
To run on localhost, use the command  
```npm start```

To produce a production build, use the command  
```npm run build```

To deploy a build to firebase hosting, use the command (Note: firebase CLI must be installed)  
```firebase deploy --only hosting```

To deploy cloud functions to firebase server, use the command (Note: firebase CLI must be installed)  
```firebase deploy --only functions```