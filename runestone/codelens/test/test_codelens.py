from runestone.unittest_base import module_fixture_maker, RunestoneTestCase

__author__ = "Brad Miller"

mf, setUpModule, tearDownModule = module_fixture_maker(__file__, True)


class ShowEvalTest_TraceMode(RunestoneTestCase):
    def test_Next_Step(self):
        driver = self.driver
        driver.get(self.host + "/index.html")
        self.assertIn("CodeLens", driver.title)
        for tdiv in ["test1", "test2", "test3", "test4", "test5", "test6"]:
            self.wait_until_ready(tdiv)
            clDiv = driver.find_element_by_id(tdiv)
            assert clDiv
            fwd = clDiv.find_element_by_id("jmpStepFwd")
            assert fwd
            bak = clDiv.find_element_by_id("jmpStepBack")
            assert bak
            assert bak.get_property("disabled") is True
