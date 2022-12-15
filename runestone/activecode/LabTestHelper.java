// *********
// |docname|
// *********
import java.io.*;
import java.lang.reflect.*;

import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * The test class LabTestHelper.
 *
 * @author  Kate McDonnell
 * @version 2020-04-27
 *
 * This class provides helper methods to make writing test classes easier. Most of them are for simplifying output.
 *
 */
public class LabTestHelper
{
    /**
     * getMethodOutput tries to run a given method in a given class and returns the output if it succeeds
     *        - only works for methods with String[] args parameter at the moment
     *        - is designed to return the output when a main method has been called
     */
    public String getMethodOutput(String className, String methodName) throws IOException
    {
        try {
            Class<?> c = Class.forName(className);
            if(c == null) {
                return "Class doesn't exist.";
            }

            Method[] meths = c.getDeclaredMethods();

            for(Method m: meths) {
                //int mods = m.getModifiers();
                //Class<?>[] params = m.getParameterTypes();

                //we have a winner!
                if(m.getName().equals(methodName)) {

                    try {
                        setupStreams();
                        String[] arg = new String[0];
                        m.invoke(null, (Object)arg);

                        String output = outContent.toString();
                        cleanUpStreams();
                        return output;
                    }
                    catch(Exception e) {
                        return "Method " + methodName + " could not be invoked";
                    }
                }
            }

        }
        catch (Exception e) {
            return "Other issue.";
        }

        return "Method " + methodName + " does not exist";
    }




    protected String cleanString(String orig)   //\\s+
    {
        return orig.replaceAll("\\s+"," ").replaceAll("[^A-Za-z0-9 ]", "").trim();
    }

    protected String cleanStringIgnoreCase(String orig)   //\\s+
    {
        return cleanString(orig.toLowerCase());
    }

    protected String failMessage(String msg)
    {
        return failMessage(msg, 70);
    }



    protected String failMessage(String msg, int maxWidth)
    {
        String stars = repeat("*", maxWidth*2);

        return "\n" + stars + "\n" + msg + "\n" + stars + "\n";
    }

    protected String createMessage(String testName, String exp, String act)
    {
        return createColMessage(testName, exp, act);
    }

    protected String createColMessage(String testName, String exp, String act)
    {
        if (exp.contains("\n"))
            return createColMessage(testName, exp, act, 70);
        else if (exp.length() < 15 && act.length() < 15)
            return createColMessage(testName, exp, act, 25);
        else if (exp.length() > act.length())
            return createColMessage(testName, exp, act, exp.length() + 5);
        else
            return createColMessage(testName, exp, act, act.length() + 5);
    }

    protected String createColMessage(String testName, String exp, String act, int maxWidth)
    {
        String stars = repeat("*", maxWidth+2);
        String lines = repeat("=", maxWidth);
        String spaces  = repeat(" ", maxWidth);

        stars = stars.substring(0, maxWidth) + "***" + stars.substring(0, maxWidth);
        lines = lines.substring(0, maxWidth) + " |  " + lines.substring(0, maxWidth);

        String output = "\n\n" + stars + "\n";
        output += (testName + " failed").toUpperCase() + "\n";

        output += ("Expected"+spaces).substring(0, maxWidth) + " |  Actual\n";
        output += lines + "\n";

        String[] explines = exp.split("\n");
        String[] actlines = act.split("\n");

        for (int i = 0; i < explines.length || i < actlines.length; i++)
        {
            if (i < explines.length)
            {
                explines[i] = explines[i].replaceAll("\t", "    ");
                if (explines[i].length() >= maxWidth)
                {
                    output += explines[i].substring(0, maxWidth);
                }
                else
                {
                    output += explines[i];
                    output += spaces.substring(explines[i].length());
                }

            }
            else
            {
                output += spaces;
            }

            output += " |  ";

            if (i == 0 && (actlines.length <= 0 || actlines[0].length() <= 0))
                output += "No output detected.";
            if (i < actlines.length)
            {
                actlines[i] = actlines[i].replaceAll("\t", "    ");
                output += actlines[i];
            }
            output += "\n";
        }

        output += stars + "\n\n";
        return output;
    }

    private static String repeat(String str, int times) {
        return new String(new char[times]).replace("\0", str);
    }

    public String addInputValuesToOutput(String outputs, String inputs)
    {
        outputs = outputs.replaceAll(":: ", ":: \n").replaceAll("\n\n", "\n");
        String[] outLines = outputs.split("\n"); //replaceAll(":: ", ":: ").
        String[] inLines = inputs.split(" ");

        String output = "";

        //output += outLines.length;

        if (outLines.length <= 1 && outLines[0].length() < 3)
            return "";

        for (int i = 0; i < outLines.length; i++)
        {
            output += outLines[i].replaceAll("\n","");
            if (i < inLines.length)
                output += " " + inLines[i];//.replaceAll("\n","");
            output += "\n";
        }
        return output.replaceAll("\n\n", "\n");
    }

    public static boolean checkRandom(String output, int min, int max)
    {
        output = output.replaceAll("[^0-9 ]", "").replaceAll("\\s+", " ").trim();

        String[] vals = output.split(" ");
        int[] nums = new int[vals.length];

        for (int i = 0; i < vals.length; i++)
        {
            try {
                int n = Integer.parseInt(vals[i]);
                //System.out.println(n);
                nums[i] = n;
                if (n < min || n > max)
                    return false;
            } catch (Exception e) {

            }
        }

        int count = 0;

        for (int i = 1; i < vals.length - 1; i++)
        {
            if (nums[i - 1] == nums[i] && nums[i] == nums[i+1])
                count++;
        }

        if (count > vals.length / 2)
            return false;

        return true;
    }

    public void setupStreams()
    {
        stdOut = System.out;
        stdErr = System.err;
        System.setOut(new PrintStream(outContent));
        outContent.reset();

    }

    public void cleanUpStreams()
    {
        System.setOut(stdOut);
        System.setErr(stdErr);
    }

    static final ByteArrayOutputStream outContent = new ByteArrayOutputStream();
    static final ByteArrayOutputStream errContent = new ByteArrayOutputStream();
    static PrintStream stdOut;
    static PrintStream stdErr;

    /**
     * Sets up the test fixture.
     *
     * Called before every test case method.
     */
    @Before
    public void setUp()
    {
    }

    /**
     * Tears down the test fixture.
     *
     * Called after every test case method.
     */
    @After
    public void tearDown()
    {
    }

}
